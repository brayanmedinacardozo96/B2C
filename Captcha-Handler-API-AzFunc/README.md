# Captcha-Handler-API-AzFunc

**Captcha-Handler-API-AzFunc** es una Azure Function desarrollada para validar tokens de Google reCAPTCHA en flujos de autenticación personalizados de Azure AD B2C. Esta función recibe el token generado por el usuario al resolver el captcha, lo verifica contra el servicio oficial de Google y retorna el resultado de la validación en formato JSON.

## Características principales

- Recibe el token de reCAPTCHA desde el frontend o desde Azure AD B2C.
- Valida el token usando la API oficial de Google reCAPTCHA.
- Retorna información relevante sobre el resultado de la validación, incluyendo éxito, timestamp y posibles errores.
- Utiliza una variable de entorno segura para el secreto de reCAPTCHA (`B2C_Recaptcha_Secret`).
- Pensada para integrarse fácilmente en flujos de políticas personalizadas de Azure AD B2C.

## Uso típico

1. El usuario resuelve el captcha en el frontend.
2. El token generado se envía a esta función.
3. La función valida el token y responde con el resultado.
4. Azure AD B2C utiliza la respuesta para permitir o denegar el acceso según la validez del captcha.

## Configuración

- Configura la variable de entorno `B2C_Recaptcha_Secret` con tu clave secreta de Google reCAPTCHA.
- Despliega la función en Azure y actualiza tus políticas B2C para consumir este endpoint.

---
## Probar en local

- Abre una terminal y ejecuta: func start
