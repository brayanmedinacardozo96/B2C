## Para ejecutar una política personalizada de Azure AD B2C desde el navegador


1. Obtén la URL de ejecución de la política. El formato es:

https://<tu-tenant>.b2clogin.com/<tu-tenant>.onmicrosoft.com/<nombre_de_la_política>/oauth2/v2.0/authorize


2. Agrega los parámetros requeridos (client_id, redirect_uri, response_type, scope, etc.). Un ejemplo completo:

https://miorganizacion1296.b2clogin.com/miorganizacion1296.onmicrosoft.com/B2C_1A_signup_signin/oauth2/v2.0/authorize?
client_id=<TU_CLIENT_ID>
&redirect_uri=https%3A%2F%2Fjwt.ms
&response_type=id_token
&scope=openid
&response_mode=fragment
&nonce=defaultNonce


3. Final 

https://miorganizacion1296.b2clogin.com/miorganizacion1296.onmicrosoft.com/B2C_1A_signup_signin/oauth2/v2.0/authorize?
client_id=5db466cf-dce8-4c21-a330-52d0530864bb
&redirect_uri=https%3A%2F%2Fjwt.ms
&response_type=id_token
&scope=openid
&response_mode=fragment
&nonce=defaultNonce


## eJUEMPLO

https://github.com/azure-ad-b2c/samples/blob/master/policies/username-signup-or-signin/policy/TrustFrameworkExtensions_Username.xml


# El orden correcto para subir los archivos de políticas personalizadas de Azure AD B2C es el siguiente:

TrustFrameworkBase.xml
TrustFrameworkLocalization.xml (si tienes localización personalizada)
TrustFrameworkExtensions.xml
SignUpOrSignin.xml (o cualquier archivo de RelyingParty, por ejemplo: B2C_1A_signup_signin.xml)