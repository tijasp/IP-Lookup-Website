function startEventListener() {
    const getDetailsButton = document.getElementById("searchButton");
    getDetailsButton.addEventListener("click", () => {
        verifyIpInput();
    });
};

function invalidIpMessage() {
    let errorMessage = document.getElementById("errorMessage");
    if (!errorMessage) {
        errorMessage = document.createElement("h2");
        errorMessage.id = "errorMessage";
        errorMessage.style.cssText = "color: red; font-size: 1rem; font-weight: 400; margin-top: 0.5rem";
        errorMessage.textContent = "Please enter a valid IP";
        document.querySelector("main").insertBefore(errorMessage, document.getElementById("infoContainer"))
    };
};

function verifyIpInput() {
    const ip = document.getElementById("ipInput").value.trim();
    /* Regex for valid IPv4 & IPv6 verification */
    const ipRegex = new RegExp("^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])|(([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|([0-9A-Fa-f]{1,4}:){1,7}:|:(:[0-9A-Fa-f]{1,4}){1,7}|([0-9A-Fa-f]{1,4}:){1,6}:[0-9A-Fa-f]{1,4}|([0-9A-Fa-f]{1,4}:){1,5}(:[0-9A-Fa-f]{1,4}){1,2}|([0-9A-Fa-f]{1,4}:){1,4}(:[0-9A-Fa-f]{1,4}){1,3}|([0-9A-Fa-f]{1,4}:){1,3}(:[0-9A-Fa-f]{1,4}){1,4}|([0-9A-Fa-f]{1,4}:){1,2}(:[0-9A-Fa-f]{1,4}){1,5}|[0-9A-Fa-f]{1,4}:(:[0-9A-Fa-f]{1,4}){1,6}|:(:[0-9A-Fa-f]{1,4}){1,6}))$")
    
    if (ipRegex.test(ip)) {
        lookupIp(ip)
            .then((data) => {
                if (data["status" === "success"]) {
                    showIpDetails(data)
                } else {
                    invalidIpMessage();
                };
            })
            .catch((error) => console.error(error));

    } else {
        invalidIpMessage();
    };
};

function showIpDetails(data) {
    const infosContainer = document.getElementById("infoContainer");
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) errorMessage.remove();

    infosContainer.innerHTML = `
        <ul>
            <li class="ipInfo">IP: <span>${data["query"]}</span></li>
            <li class="ipInfo">ISP: <span>${data["isp"]}</span></li>
            <li class="ipInfo">Country: <span>${data["country"]} (${data["countryCode"]})</span></li>
            <li class="ipInfo">Region/State: <span>${data["regionName"]}</span></li>
            <li class="ipInfo">City: <span>${data["city"]} (${data["zip"]})</span></li>
            <li class="ipInfo">Latitude: <span>${data["lat"]}</span></li>
            <li class="ipInfo">Longitude: <span>${data["lon"]}</span></li>
            <li class="ipInfo">Timezone: <span>${data["timezone"]}</span></li>
        </ul>
    `;
};

async function lookupIp(ip) {
    const api = `http://ip-api.com/json/${ip}`;
    let response = await fetch(api)
    return response.json();
};

startEventListener();