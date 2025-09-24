export async function copyToClipboard(content: string) {
    try {
        await navigator.clipboard.writeText(content);
        console.log("Text copied to clipboard:", content);
    } catch (err) {
        console.error("Failed to copy text:", err);
    }
}
