function startEventListener() {
    const getDetailsButton = document.getElementById("getIpDetailsButton");
    getDetailsButton.addEventListener("click", () => {
        verifyIpInput();
    });
};

function invalidIpMessage() {
    let errorMessage = document.getElementById("errorMessage");
    if (!errorMessage) {
        const errorDiv = document.createElement("h2");
        errorDiv.id = "errorMessage";
        errorDiv.style.cssText = "color: red; font-size: 1rem; font-weight: 400; margin-top: 0.5rem";
        errorDiv.textContent = "Please enter a valid IP";
        document.querySelector(".inputSection").append(errorDiv);
    };
};

function verifyIpInput() {
    const ip = document.getElementById("ipInput").value.trim();
    /* Regex for valid IPv4 & IPv6 verification */
    const ipRegex = new RegExp("^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])|(([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|([0-9A-Fa-f]{1,4}:){1,7}:|:(:[0-9A-Fa-f]{1,4}){1,7}|([0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|([0-9A-Fa-f]{1,4}:){1,5}(:[0-9A-Fa-f]{1,4}){1,2}|([0-9A-Fa-f]{1,4}:){1,4}(:[0-9A-Fa-f]{1,4}){1,3}|([0-9A-Fa-f]{1,4}:){1,3}(:[0-9A-Fa-f]{1,4}){1,4}|([0-9A-Fa-f]{1,4}:){1,2}(:[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(:[0-9A-Fa-f]{1,4}){1,6}|:(:[0-9A-Fa-f]{1,4}){1,6}))$")
    
    if (ipRegex.test(ip)) {

    } else {
        invalidIpMessage();
    };
};

async function lookupIp(ip) {
    const api = `http://ip-api.com/json/${ip}`;
    let response = await fetch(api)

    return response.json
};

startEventListener();