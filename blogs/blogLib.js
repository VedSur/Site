const sections_article = document.getElementById("sections");

function createSectionWithHeading(sectionId, headingText) {
    const section = document.createElement('section');
    section.id = sectionId;
    const heading = document.createElement('h2');
    heading.textContent = headingText;
    section.appendChild(heading);
    sections_article.appendChild(section);
    updateTableOfContents(sectionId, headingText);
}

function insertTextIntoSection(sectionId, textContent) {
    const section = document.getElementById(sectionId);
    if (section) {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = textContent.replace(RegExp('\n', 'g'), '<br>');
        section.appendChild(paragraph);
    }
}

function insertCodeBlockIntoSection(sectionId, codeContent, language) {
    const section = document.getElementById(sectionId);
    if (section) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.classList.add('language-' + language);
        code.textContent = codeContent;
        pre.appendChild(code);
        section.appendChild(pre);
    }
}

function updateTableOfContents(sectionId, headingText) {
    const toc = document.getElementById('table-of-contents-list');
    if (toc) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${sectionId}`; 
        a.textContent = headingText;
        li.appendChild(a);
        toc.appendChild(li);
    }
}
