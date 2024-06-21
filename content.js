function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text successfully copied to clipboard:', text);
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}

async function extractAndCopy() {
    console.log('Starting extraction and copy process.');

    // Get all message divs, for both user and assistant messages
    let messageDivs = document.querySelectorAll('.font-user-message, .font-claude-message');

    if (messageDivs.length > 0) {
        let lastMessageDiv, secondLastMessageDiv;

        if (messageDivs.length === 2) {
            // Get the last two messages if only two messages are present
            lastMessageDiv = messageDivs[messageDivs.length - 1];
            secondLastMessageDiv = messageDivs[messageDivs.length - 2];
        } else {
            // Get the last message and the third last message if more than two messages are present
            lastMessageDiv = messageDivs[messageDivs.length - 1];
            secondLastMessageDiv = messageDivs[messageDivs.length - 3];
        }

        // Function to extract text from a message div
        function extractTextFromMessageDiv(messageDiv) {
            let messageText = messageDiv.textContent || "";
            
            // Check if there's a code block
            let codeBlock = messageDiv.querySelector('code');
            if (codeBlock) {
                messageText = codeBlock.textContent || "";
            }
            
            console.log('Message text content:', messageText);
            return messageText;
        }

        let secondLastMessageText = extractTextFromMessageDiv(secondLastMessageDiv);
        copyTextToClipboard(secondLastMessageText);

        // Delay to ensure the clipboard isn't overwritten immediately
        await new Promise(resolve => setTimeout(resolve, 200)); // delay

        // Extract text from the last and second last messages and copy to clipboard
        let lastMessageText = extractTextFromMessageDiv(lastMessageDiv);
        copyTextToClipboard(lastMessageText);
    } else {
        console.log('No message divs found.');
    }
}

extractAndCopy();