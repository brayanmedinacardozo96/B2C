 <!--Captcha GOOGLE-->
        <TechnicalProfile Id="login-Recaptcha">
          <DisplayName>Google service Check to verify user is human</DisplayName>
          <Protocol Name="Proprietary" Handler="Web.TPEngine.Providers.RestfulProvider, Web.TPEngine, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null" />
          <Metadata>
            <Item Key="ServiceUrl">https://b2cgooglecaptchaapi.azurewebsites.net/api/identity</Item>
            <Item Key="AuthenticationType">None</Item>
            <Item Key="SendClaimsIn">Body</Item>
            <!-- JSON, Form, Header, and Query String formats supported -->
            <Item Key="ClaimsFormat">Body</Item>
            <!-- Defines format to expect claims returning to B2C -->
            <!-- REMOVE the following line in production environments -->
            <Item Key="AllowInsecureAuthInProduction">true</Item>
          </Metadata>
          <InputClaims>
            <InputClaim ClaimTypeReferenceId="g-recaptcha-response-toms" PartnerClaimType="captcha" DefaultValue="0" />
          </InputClaims>
        </TechnicalProfile>
        <!--Captcha GOOGLE-->