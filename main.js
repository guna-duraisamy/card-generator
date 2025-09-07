const $ = (sel, root = document) => root.querySelector(sel);

async function handleReset() {
    const f = document.forms.cardForm;

    [...f.elements].forEach(el => {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") {
            el.value = "";
        }
    });

    document.querySelectorAll("#pfront span, #pback span, #sfront span, #sback span")
        .forEach(el => el.textContent = "");

    $('#qrInput').value = "";
    $('#signInput').value = "";

    $('#qrBox').innerHTML = "";
    $('#signBox').innerHTML = "";
    $('#sqrBox').innerHTML = "";
    $('#ssignBox').innerHTML = "";
}


async function handleGenerate() {
    const f = document.forms.cardForm;

    // Primary Card
    // FRONT
    $('#registerFrontNo').textContent = f.registerNo.value.trim();
    $('#fuel').textContent = f.fuel.value.trim();
    $('#emissionNorms').textContent = f.emissionNorms.value.trim();
    $('#registerDate').textContent = f.registerDate.value.trim();
    $('#validDate').textContent = f.validDate.value.trim();
    $('#chassisNo').textContent = f.chassisNo.value.trim();
    $('#ownerSerial').textContent = f.ownerSerial.value.trim();
    $('#engineNo').textContent = f.engineNo.value.trim();
    $('#ownerName').textContent = f.ownerName.value.trim();
    $('#cardIssueDate').textContent = f.cardIssueDate.value.trim();
    $('#guardian').textContent = f.guardian.value.trim();
    $('#address').textContent = f.address.value.trim();

    // BACK
    $('#registerBackNo').textContent = f.registerNo.value.trim();
    $('#vehicleClass').textContent = f.vehicleClass.value.trim();
    $('#manufactureDate').textContent = f.manufactureDate.value.trim();
    $('#cylinderCount').textContent = f.cylinderCount.value.trim();
    $('#axleCount').textContent = f.axleCount.value.trim();
    $('#makesName').textContent = f.makesName.value.trim();
    $('#modelName').textContent = f.modelName.value.trim();
    $('#colour').textContent = f.colour.value.trim();
    $('#bodyType').textContent = f.bodyType.value.trim();
    $('#seatingAll').textContent = f.seatingAll.value.trim();
    $('#standing').textContent = f.standing.value.trim();
    $('#sleeperCapacity').textContent = f.sleeperCapacity.value.trim();
    $('#unLaden').textContent = f.unLaden.value.trim();
    $('#laden').textContent = f.laden.value.trim();
    $('#grossCombinationWeight').textContent = f.grossCombinationWeight.value.trim();
    $('#cubicCapacity').textContent = f.cubicCapacity.value.trim();
    $('#horsePower').textContent = f.horsePower.value.trim();
    $('#wheelBase').textContent = f.wheelBase.value.trim();
    $('#financerName').textContent = f.financerName.value.trim();
    $('#registerationAuthority').textContent = f.registerationAuthority.value.trim();

    // Files
    const qrFile = $('#qrInput').files[0];
    if (qrFile) {
        const url = await fileToDataURL(qrFile);
        $('#qrBox').innerHTML = `<img alt="QR" src="${url}" style="width: 62px; height: 62px; object-fit: cover;"/>`;
    } else {
        // $('#qrBox').innerHTML = `<img alt="QR Placeholder" src="qr.webp" style="width: 62px; height: 62px; object-fit: cover;"/>`;
    }

    const signFile = $('#signInput').files[0];
    if (signFile) {
        const url = await fileToDataURL(signFile);
        $('#signBox').innerHTML = `<img alt="Signature" src="${url}" style="width: 64px; height: 16px; object-fit: contain;"/>`;
    } else {
        // $('#signBox').innerHTML = `<img alt="Signature Placeholder" src="sign.png" style="width: 64px; height: 16px; object-fit: contain;"/>`;
    }

    // Secondary Card
    // FRONT
    $('#sfuel').textContent = f.fuel.value.trim();
    $('#sregisterFrontNo').textContent = f.registerNo.value.trim();
    $('#sregisterDate').textContent = f.registerDate.value.trim();
    $('#schassisNo').textContent = f.chassisNo.value.trim();
    $('#svalidDate').textContent = f.validDate.value.trim();
    $('#sengineNo').textContent = f.engineNo.value.trim();
    $('#sownerSerial').textContent = f.ownerSerial.value.trim();
    $('#sownerName').textContent = f.ownerName.value.trim();
    $('#sguardian').textContent = f.guardian.value.trim();
    $('#saddress').textContent = f.address.value.trim();
    $('#stransaction').textContent = f.transaction.value.trim();

    // BACK
    $('#svehicleClass').textContent = f.vehicleClass.value.trim();
    $('#sregisterBackNo').textContent = f.registerNo.value.trim();
    $('#smakesName').textContent = f.makesName.value.trim();
    $('#smanufactureDate').textContent = f.manufactureDate.value.trim();
    $('#smodelName').textContent = f.modelName.value.trim();
    $('#swheelBase').textContent = f.wheelBase.value.trim();
    $('#scolour').textContent = f.colour.value.trim();
    $('#scubicCapacity').textContent = f.cubicCapacity.value.trim();
    $('#sbodyType').textContent = f.bodyType.value.trim();
    $('#scylinderCount').textContent = f.cylinderCount.value.trim();

    $('#sfinalseating').textContent = f.seatingAll.value.trim() + ' / ' + f.standing.value.trim();

    $('#sfinancerName').textContent = f.financerName.value.trim();

    $('#sfinalladen').textContent = f.laden.value.trim() + ' / ' + f.unLaden.value.trim();

    $('#stax').textContent = f.tax.value.trim();
    $('#sregisterationAuthority').textContent = f.registerationAuthority.value.trim();

    // Files
    const sqrFile = $('#qrInput').files[0];
    if (sqrFile) {
        const url = await fileToDataURL(sqrFile);
        $('#sqrBox').innerHTML = `<img alt="QR" src="${url}" style="width: 53px; height: 53px; object-fit: cover;"/>`;
    } else {
        // $('#sqrBox').innerHTML = `<img alt="QR Placeholder" src="qr.webp" style="width: 53px; height: 53px; object-fit: cover;"/>`;
    }
    const ssignFile = $('#signInput').files[0];
    if (ssignFile) {
        const url = await fileToDataURL(ssignFile);
        $('#ssignBox').innerHTML = `<img alt="Signature" src="${url}" style="width: 64px; height: 16px; object-fit: contain;"/>`;
    } else {
        // $('#ssignBox').innerHTML = `<img alt="Signature Placeholder" src="sign.png" style="width: 64px; height: 16px; object-fit: contain;"/>`;
    }
}

function fileToDataURL(file) {
    return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file);
    });
}

window.addEventListener('DOMContentLoaded', handleGenerate);

// helper: capture with transparent background
async function captureTransparent(el, filename) {
    const oldBg = el.style.background;   // save old background (white)
    el.style.background = "transparent"; // force transparent for capture

    const canvas = await html2canvas(el, { scale: 3, backgroundColor: null });

    el.style.background = oldBg; // restore old background (white)

    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

// --- Primary ---
async function downloadPrimaryImages() {
    const f = document.forms.cardForm;

    const pfront = document.getElementById("pfront");
    const pback = document.getElementById("pback");

    await captureTransparent(pfront, f.registerNo.value.trim() + "_primary_front_card.png");
    await captureTransparent(pback, f.registerNo.value.trim() + "_primary_back_card.png");
}

// --- Secondary ---
async function downloadSecondaryImages() {
    const f = document.forms.cardForm;

    const sfront = document.getElementById("sfront");
    const sback = document.getElementById("sback");

    await captureTransparent(sfront, f.registerNo.value.trim() + "_secondary_front_card.png");
    await captureTransparent(sback, f.registerNo.value.trim() + "_secondary_back_card.png");
}
