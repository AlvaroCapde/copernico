<script>
    import {onMount} from "svelte";
    import { functions } from "../services/Firebase.js";
    import { httpsCallable } from "firebase/functions";
    export let prima;
    let pdfElement
    const generatePolizaPDF = httpsCallable(functions, "generatePolizaPDF");
    const policyData = {
        insuredName: "John Doe",
        policyNumber: "POL123456",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        coverages: [
            { type: "Life Insurance", description: "Covers accidental death." },
            { type: "Health Insurance", description: "Covers medical expenses." },
        ],
    };


    const onGenerate = async () => {
        try{
        const response = await generatePolizaPDF({policyData})
        const pdfBase64 = response.data.pdfBase64;
            const cleanedBase64 = pdfBase64.replace(/\s/g, "");
        // Convert Base64 to Blob
        const pdfBlob = new Blob(
            [Uint8Array.from(atob(cleanedBase64), (c) => c.charCodeAt(0))],
            { type: "application/pdf" }
        );
            const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = "PolizaDeSeguro.pdf";
        link.click();

        console.log("PDF generated and downloaded.");
        }catch (error){
            console.error("Error generating PDF: ", error);
        }
    }
</script>
<div id="pdf" class="text-3xl font-bold text-gray-400 py-20">Tu costo de prima: {prima}</div>
<button on:click={onGenerate} class="mt-10 primary-button px-3 py-2" >Generate PDF</button>