setTimeout(() => {
    buildSelectLanguage();
    togglePassword();
    buildErrorGeneral();
    captch();
}, 4000);

window.onclick = function (event) {
    const modal = document.getElementById('miModal');
    if (event.target === modal) {
        closeModal();
    }
};

function buildErrorGeneral() {
    const errorContainer = document.querySelector('.error.pageLevel');

    if (!errorContainer) return;

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (
                mutation.type === 'childList' &&
                mutation.target.tagName === 'P'
            ) {
                const errorText = mutation.target.textContent.trim();
                if (errorText) {
                    document.querySelector('.error.pageLevel').style.display = "none"
                    toast(errorText);
                    document.querySelector('.error.pageLevel p').textContent = '';
                }
            }
        }
    });

    const p = errorContainer.querySelector('p');
    if (p) {
        observer.observe(p, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }
}

function buildSelectLanguage() {
    /*const select = document.getElementById("select-language")
    select.addEventListener('change', function () {
        const resultado = document.getElementById('panel-resultado');
        resultado.textContent = 'Seleccionaste: ' + this.value;
    });*/

}

function openModal() {
    document.getElementById('miModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('miModal').style.display = 'none';
}

function toast(message) {
    Toastify({
        text: message,
        duration: 6000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, rgb(201, 61, 61),rgb(201, 61, 61))",
        },
        onClick: function () { }
    }).showToast();
}

function togglePassword() {
    try {
        const passwordInput = document.querySelector('input[type="password"]');
        if (!passwordInput) return; // <-- Previene el error si no existe el input

        const toggle = document.createElement("span");
        toggle.className = "toggle-password";
        toggle.appendChild(buildOpenEye());

        toggle.onclick = function () {
            const input = document.getElementById("password");
            if (input.type === "password") {
                input.type = "text";
                toggle.innerHTML = '';
                toggle.appendChild(buildCloseEye());
            } else {
                input.type = "password";
                toggle.innerHTML = '';
                toggle.appendChild(buildOpenEye());
            }
        };

        const passwordWrapper = passwordInput.parentElement;
        passwordWrapper.appendChild(toggle);

    } catch (error) {
        console.error("Error al crear el toggle de contraseña:", error);
    }
}

function buildOpenEye() {
    // Crear el elemento SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "15");
    svg.setAttribute("viewBox", "0 0 20 15");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // Primer path (pupila)
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M8 7.90771C8 8.43815 8.21071 8.94686 8.58579 9.32193C8.96086 9.697 9.46957 9.90771 10 9.90771C10.5304 9.90771 11.0391 9.697 11.4142 9.32193C11.7893 8.94686 12 8.43815 12 7.90771C12 7.37728 11.7893 6.86857 11.4142 6.4935C11.0391 6.11843 10.5304 5.90771 10 5.90771C9.46957 5.90771 8.96086 6.11843 8.58579 6.4935C8.21071 6.86857 8 7.37728 8 7.90771Z");
    path1.setAttribute("stroke", "#545454");
    path1.setAttribute("stroke-width", "2");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");

    // Segundo path (contorno del ojo)
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M19 7.90771C16.6 11.9077 13.6 13.9077 10 13.9077C6.4 13.9077 3.4 11.9077 1 7.90771C3.4 3.90771 6.4 1.90771 10 1.90771C13.6 1.90771 16.6 3.90771 19 7.90771Z");
    path2.setAttribute("stroke", "#545454");
    path2.setAttribute("stroke-width", "2");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");

    // Añadir los paths al SVG
    svg.appendChild(path1);
    svg.appendChild(path2);

    return svg;

}

function buildCloseEye() {

    // Crear el elemento SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "none");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    // Crear el path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M8.585 8.58701C8.20999 8.96215 7.99936 9.47091 7.99945 10.0014C7.99954 10.5318 8.21035 11.0405 8.5855 11.4155C8.96065 11.7905 9.46941 12.0012 9.99986 12.0011C10.5303 12.001 11.039 11.7902 11.414 11.415M14.681 14.673C13.2782 15.5507 11.6547 16.0109 10 16C6.4 16 3.4 14 1 10C2.272 7.88 3.712 6.322 5.32 5.326M8.18 4.18C8.77904 4.05873 9.38881 3.99842 10 4C13.6 4 16.6 6 19 10C18.334 11.11 17.621 12.067 16.862 12.87M1 1L19 19");
    path.setAttribute("stroke", "#545454");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    // Añadir el path al SVG
    svg.appendChild(path);

    return svg
}


function captch() {

    // Espera a que el formulario de B2C esté en el DOM
    // const observer = new MutationObserver(function (mutations, obs) {
    const form = document.querySelector("#api form");
    if (form && !form.querySelector(".g-recaptcha")) {
        // Crea el div de reCAPTCHA
        const recaptchaDiv = document.createElement("div");
        recaptchaDiv.className = "g-recaptcha";
        recaptchaDiv.setAttribute("data-sitekey", "6LeHAEIrAAAAADIBNwxGhKQZnLbKUtbJQt0YiNaL");
        // Inserta el reCAPTCHA antes del botón submit
        // const submitBtn = form.querySelector("button[type=submit], input[type=submit]");
        const buttonsDiv = form.querySelector(".buttons");

        if (buttonsDiv && buttonsDiv.parentNode) {
            buttonsDiv.parentNode.insertBefore(recaptchaDiv, buttonsDiv);
        } else {
            form.appendChild(recaptchaDiv);
        }

        /*if (submitBtn?.parentNode) {
            form.insertBefore(recaptchaDiv, submitBtn);
        } else {
            form.appendChild(recaptchaDiv);
        }*/
        // Renderiza el widget si la API ya está cargada
        if (window.grecaptcha) {
            window.grecaptcha.render(recaptchaDiv, {
                sitekey: "6LeHAEIrAAAAADIBNwxGhKQZnLbKUtbJQt0YiNaL"
            });
        }

        form.addEventListener('submit', function (e) {
            // Obtiene el valor del captcha
            var captchaResponse = grecaptcha.getResponse();
            if (!captchaResponse) {
                e.preventDefault();
                toast("Por favor, resuelve el captcha para continuar.");
                return false;
            }
            // Crea o actualiza el input oculto para enviar el token
            let input = form.querySelector('input[name="recaptchaToken"]');
            if (!input) {
                input = document.createElement("input");
                input.type = "hidden";
                input.name = "recaptchaToken";
                form.appendChild(input);
            }
            input.value = captchaResponse;
        });
    }


}


// ReCAPTCHA v3
function executeRecaptchaAndSubmit(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(function () {
        grecaptcha.enterprise.execute('6LeHAEIrAAAAADIBNwxGhKQZnLbKUtbJQt0YiNaL', { action: 'login' }).then(function (token) {
            document.getElementById('recaptchaToken').value = token;
            e.target.submit();
        });
    });
}


