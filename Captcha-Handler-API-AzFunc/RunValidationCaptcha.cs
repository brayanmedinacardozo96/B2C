using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace BHD.Function
{
    public interface IRecaptchaValidator
    {
        Task<string> ValidateAsync(string captchaToken);
    }

    public class RecaptchaValidator : IRecaptchaValidator
    {
        private readonly string _captchaSecret;
        private readonly string _recaptchaUrl;

        public RecaptchaValidator()
        {
            _captchaSecret = System.Environment.GetEnvironmentVariable("B2C_Recaptcha_Secret");
            _recaptchaUrl = System.Environment.GetEnvironmentVariable("RecaptchaUrl");
        }

        public async Task<string> ValidateAsync(string captchaToken)
        {
            using (var client = new HttpClient())
            {
                 var dict = new Dictionary<string, string>
                {
                    { "secret", _captchaSecret },
                    { "response", captchaToken }
                };

                var res = await client.PostAsync(_recaptchaUrl, new FormUrlEncodedContent(dict));
                var contents = await res.Content.ReadAsStringAsync();

                if (res.StatusCode != HttpStatusCode.OK)
                {
                    var respContent = new { version = "1.0.0", status = (int)HttpStatusCode.BadRequest, userMessage = "Captcha API failed" };
                    return JsonConvert.SerializeObject(respContent);
                }

                return contents;
            }
        }
    }

    public class RunValidationCaptcha
    {
        private const string JsonContentType = "application/json";
        private readonly IRecaptchaValidator _recaptchaValidator;

        public RunValidationCaptcha(ILogger<RunValidationCaptcha> log)
        {
            _recaptchaValidator = new RecaptchaValidator();
        }

        [FunctionName("RunValidationCaptcha")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "captcha" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "captcha", In = ParameterLocation.Query, Required = false, Type = typeof(string), Description = "The captcha response")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req)
        {
            string captcha = req.Query["captcha"];
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            captcha = captcha ?? data?.captcha;

            if (string.IsNullOrEmpty(captcha))
            {
                return CreateContentResultFail(HttpStatusCode.Conflict, "Invalid Captcha");
            }

            var contents = await _recaptchaValidator.ValidateAsync(captcha);
            JObject obj = JObject.Parse(contents);
            bool success = obj["success"] != null && (bool)obj["success"];

            if (success)
            {
                return CreateContentResultSuccess(contents);
            }

            return CreateContentResultFail(HttpStatusCode.Conflict, "Captcha failed, retry the Captcha.");
        }

        private ContentResult CreateContentResultFail(HttpStatusCode statusCode, string message)
        {
            var contentObj = new { version = "1.0.0", status = (int)HttpStatusCode.BadRequest, userMessage = message };
            var json = JsonConvert.SerializeObject(contentObj);
            return new ContentResult
            {
                StatusCode = (int)statusCode,
                Content = json,
                ContentType = JsonContentType
            };
        }

        private ContentResult CreateContentResultSuccess(string contents)
        {
            return new ContentResult
            {
                StatusCode = (int)HttpStatusCode.OK,
                Content = contents,
                ContentType = JsonContentType
            };
        }
    }
}

