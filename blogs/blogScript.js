let currentSectionId = 0;  
let lastSectionId = null;  
function runScript(script) {
    const lines = script.split('\n');
    let codeContent = '';
    let textContent = '';
    let codeLanguage = null;
    let inCodeBlock = false;
    let inTextBlock = false;
    lines.forEach(line => {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('%section ')) {
            
            if (inCodeBlock) {
                insertCodeBlockIntoSection(lastSectionId, codeContent, codeLanguage);
                codeContent = '';
                inCodeBlock = false;
            }
            if (inTextBlock) {
                insertTextIntoSection(lastSectionId, textContent.trim());
                textContent = '';
                inTextBlock = false;
            }
            const headingText = trimmedLine.slice(8).trim();
            currentSectionId++;
            lastSectionId = `section${currentSectionId}`;
            createSectionWithHeading(lastSectionId, headingText);
        } else if (trimmedLine.startsWith('%text')) {
            
            if (inCodeBlock) {
                insertCodeBlockIntoSection(lastSectionId, codeContent, codeLanguage);
                codeContent = '';
                inCodeBlock = false;
            }
            if (inTextBlock) {
                insertTextIntoSection(lastSectionId, textContent.trim());
                textContent = '';
            }
            inTextBlock = true;  
            textContent = '';    
        } else if (trimmedLine.startsWith('%code ')) {
            
            if (inCodeBlock) {
                insertCodeBlockIntoSection(lastSectionId, codeContent, codeLanguage);
                codeContent = '';
            }
            if (inTextBlock) {
                insertTextIntoSection(lastSectionId, textContent.trim());
                textContent = '';
                inTextBlock = false;
            }
            codeLanguage = trimmedLine.slice(5).trim();
            inCodeBlock = true;
            codeContent = '';
        } else if (inCodeBlock) {
            
            codeContent += (codeContent ? '\n' : '') + line;
        } else if (inTextBlock) {
            
            textContent += (textContent ? '\n' : '') + line;
        } else if (trimmedLine !== '') {
            console.error(`Unknown command or misplaced text: ${trimmedLine}`);
        }
    });
    
    if (inCodeBlock) {
        insertCodeBlockIntoSection(lastSectionId, codeContent, codeLanguage);
    }
    if (inTextBlock) {
        insertTextIntoSection(lastSectionId, textContent.trim());
    }
}

function loadScriptFromFile(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load script file: ${response.statusText}`);
            }
            return response.text();
        })
        .then(scriptContent => {
            runScript(scriptContent);
        })
        .catch(error => {
            console.error(`Error loading script: ${error}`);
        });
}

