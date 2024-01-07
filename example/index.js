import {createClient, createConfig} from "./lib/bin/web/index.js";

const field = "my-example-field";
const appIdInput = document.getElementById("app");
const createButton = document.getElementById("create");
const doneButton = document.getElementById("done");
const generateButton = document.getElementById("generate");
const incrementButton = document.getElementById("increment");
const snippetText = document.getElementById("snippet");
const valueText = document.getElementById("value");
const watchButton = document.getElementById("watch");

async function setup() {
    const config = createConfig({ app: appIdInput.value });
    await config.fill()
    const client = createClient(config);
    window.donedb = client;
}

createButton.onclick = function() {
    window.donedb.create(field, 0).then(() => {
        console.log("Created/reset field", field);
    });
}

incrementButton.onclick = function() {
    window.donedb.increment(field).then(() => {
        console.log("Incremented field", field);
    });
}

generateButton.onclick = function() {
    const appId = window.crypto.randomUUID();
    appIdInput.value = appId;
    appIdInput.setAttribute("disabled", true);
    generateButton.style.display = "none";
}

doneButton.onclick = function() {
    doneButton.style.display = "none";
    generateButton.style.display = "none";
    setup().then(() => {
        console.log("DoneDb example setup complete!")
        updateSnippet();
    });
}

watchButton.onclick = function() {
    watchButton.style.display = "none";
    window.donedb.watch(field, function(data) {
        valueText.innerHTML = data.value;
    });
}

function updateSnippet() {
    const appId = appIdInput.value;
    const text = document.createTextNode(`
    <script>
import {createClient, createConfig} from "https://cdn.jsdelivr.net/npm/donedb@0.0.2/lib/bin/web/index.min.js";
    const fieldvalue = document.getElementById("donedb-field-value")
    async function setup() {
        const config = createConfig({ app: ${appId} });
        await config.fill()
        const client = createClient(config);
        window.donedb = client;
    }
    function watch() {
        if (window.donedb) {
            window.donedb.watch(field, function(data) {
                fieldvalue.innerHTML = data.value;
            });
        } else {
            console.error("Missing window.donedb. DoneDb setup might have failed.")
        }
    }
    setup().then(() => {
        console.log("DoneDb setup complete!")
        watch();
    });
    </script>
    <div id="donedb-field-value"></div>
    `);
    snippetText.appendChild(text);
}
