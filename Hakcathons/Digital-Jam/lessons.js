const lessons = [
  // Existing lessons (1–10)
  {
    id: 1,
    title: "HTML Document Structure",
    explanation: "HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every HTML document has a basic structure with the DOCTYPE declaration, html, head, and body elements.",
    instructions: "Create a basic HTML document with a DOCTYPE declaration, html, head, and body elements. Inside the head, add a title element with 'My First Webpage' as its content.",
    initialCode: "<!-- Write your HTML code below -->\n\n\n",
    expectedOutput: function (code) {
      return (
        code.includes("<!DOCTYPE html>") &&
        code.includes("<html>") &&
        code.includes("</html>") &&
        code.includes("<head>") &&
        code.includes("</head>") &&
        code.includes("<body>") &&
        code.includes("</body>") &&
        code.includes("<title>") &&
        code.includes("My First Webpage") &&
        code.includes("</title>")
      );
    },
    hints: [
      "Start with <!DOCTYPE html> to declare the document type",
      "Add opening and closing <html> tags that contain the entire document",
      "Within the html tags, add <head> and <body> sections",
      "Inside the head section, add <title>My First Webpage</title>",
    ],
    validationRules: [
      {
        pattern: /<!DOCTYPE html>/i,
        message: "Make sure to include the DOCTYPE declaration",
      },
      {
        pattern: /<html>[\s\S]*<\/html>/i,
        message: "Your document should include opening and closing html tags",
      },
      {
        pattern: /<head>[\s\S]*<\/head>/i,
        message: "Your document should include a head section",
      },
      {
        pattern: /<title>[\s\S]*My First Webpage[\s\S]*<\/title>/i,
        message: "Include a title element with 'My First Webpage' as content",
      },
      {
        pattern: /<body>[\s\S]*<\/body>/i,
        message: "Your document should include a body section",
      },
    ],
  },
  {
    id: 2,
    title: "Headings and Paragraphs",
    explanation: "HTML uses heading elements (h1 to h6) to define headings, with h1 being the most important. Paragraph elements (p) are used for blocks of text.",
    instructions: "Create a webpage with an h1 heading 'About Me', an h2 heading 'My Hobbies', and at least two paragraphs of text under each heading.",
    initialCode:
      "<!DOCTYPE html>\n<html>\n<head>\n  <title>About Me Page</title>\n</head>\n<body>\n  <!-- Add your headings and paragraphs here -->\n  \n  \n</body>\n</html>",
    expectedOutput: function (code) {
      return (
        code.includes("<h1>") &&
        code.includes("</h1>") &&
        code.includes("<h2>") &&
        code.includes("</h2>") &&
        code.includes("<p>") &&
        (code.match(/<p>/g) || []).length >= 2 &&
        code.includes("</p>")
      );
    },
    hints: [
      "Use <h1>About Me</h1> for the main heading",
      "Use <h2>My Hobbies</h2> for the subheading",
      "Add paragraphs using the <p> tag: <p>Your text here</p>",
    ],
    validationRules: [
      {
        pattern: /<h1>[\s\S]*About Me[\s\S]*<\/h1>/i,
        message: "Include an h1 heading with 'About Me' as content",
      },
      {
        pattern: /<h2>[\s\S]*My Hobbies[\s\S]*<\/h2>/i,
        message: "Include an h2 heading with 'My Hobbies' as content",
      },
      {
        pattern: /<p>[\s\S]*<\/p>[\s\S]*<p>[\s\S]*<\/p>/i,
        message: "Include at least two paragraph elements",
      },
    ],
  },
  {
    id: 3,
    title: "Links and Images",
    explanation: "HTML uses anchor elements (a) to create hyperlinks to other pages or resources. The img element is used to embed images in a webpage.",
    instructions: "Create a webpage with a heading, an image, and a link. The image should have alt text, and the link should open in a new tab.",
    initialCode:
      "<!DOCTYPE html>\n<html>\n<head>\n  <title>Links and Images</title>\n</head>\n<body>\n  <!-- Add your heading, image, and link here -->\n  \n  \n</body>\n</html>",
    expectedOutput: function (code) {
      return (
        code.includes("<h1>") &&
        code.includes("<img") &&
        code.includes("alt=") &&
        code.includes("<a") &&
        code.includes("href=") &&
        code.includes('target="_blank"')
      );
    },
    hints: [
      "Use <h1>My Favorite Website</h1> for the heading",
      'Add an image with <img src="image.jpg" alt="Description of image">',
      'Create a link with <a href="https://example.com" target="_blank">Visit Example</a>',
    ],
    validationRules: [
      {
        pattern: /<h1>[\s\S]*<\/h1>/i,
        message: "Include an h1 heading",
      },
      {
        pattern: /<img[^>]+src=["'][^"']+["'][^>]*>/i,
        message: "Include an image with a src attribute",
      },
      {
        pattern: /<img[^>]+alt=["'][^"']*["'][^>]*>/i,
        message: "Your image should have an alt attribute",
      },
      {
        pattern: /<a[^>]+href=["'][^"']+["'][^>]*>/i,
        message: "Include a link with an href attribute",
      },
      {
        pattern: /<a[^>]+target=["']_blank["'][^>]*>/i,
        message: 'Your link should have target="_blank" to open in a new tab',
      },
    ],
  },
  // ... (Lessons 4–10 from your original code)
  // New lessons start here
  {
    id: 11,
    title: "Radio Buttons and Checkboxes",
    explanation: "Radio buttons and checkboxes are input elements that allow users to select options. Radio buttons are used for single selections, while checkboxes allow multiple selections.",
    instructions: "Create a form with two radio buttons for gender selection (Male, Female) and three checkboxes for hobbies (Reading, Sports, Travel).",
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Radio Buttons and Checkboxes</title>
  </head>
  <body>
    <!-- Add your form with radio buttons and checkboxes here -->
  </body>
</html>`,
    expectedOutput: function (code) {
      return (
        code.includes('<input type="radio"') &&
        code.includes('<input type="checkbox"') &&
        (code.match(/<input type="radio"/g) || []).length >= 2 &&
        (code.match(/<input type="checkbox"/g) || []).length >= 3
      );
    },
    hints: [
      'Use <input type="radio"> for radio buttons.',
      'Use <input type="checkbox"> for checkboxes.',
      'Add a name attribute to group radio buttons (e.g., name="gender").',
    ],
    validationRules: [
      {
        pattern: /<input type="radio"/i,
        message: "Include at least two radio buttons.",
      },
      {
        pattern: /<input type="checkbox"/i,
        message: "Include at least three checkboxes.",
      },
      {
        pattern: /name=["']gender["']/i,
        message: 'Add a name attribute to group radio buttons (e.g., name="gender").',
      },
    ],
  },
  {
    id: 12,
    title: "HTML Forms",
    explanation: "HTML forms are used to collect user input. They can include text fields, dropdowns, text areas, and buttons.",
    instructions: "Create a form with a text input for name, a dropdown for country, a text area for comments, and a submit button.",
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>HTML Forms</title>
  </head>
  <body>
    <!-- Add your form here -->
  </body>
</html>`,
    expectedOutput: function (code) {
      return (
        code.includes('<input type="text"') &&
        code.includes('<select>') &&
        code.includes('<textarea>') &&
        code.includes('<button>')
      );
    },
    hints: [
      'Use <input type="text"> for text input.',
      'Use <select> and <option> for dropdowns.',
      'Use <textarea> for multi-line text input.',
      'Use <button type="submit"> for the submit button.',
    ],
    validationRules: [
      {
        pattern: /<input type="text"/i,
        message: "Include a text input field.",
      },
      {
        pattern: /<select>/i,
        message: "Include a dropdown using <select>.",
      },
      {
        pattern: /<textarea>/i,
        message: "Include a text area for comments.",
      },
      {
        pattern: /<button type="submit">/i,
        message: 'Include a submit button with type="submit".',
      },
    ],
  },
  {
    id: 13,
    title: "HTML Tables",
    explanation: "HTML tables are used to display data in rows and columns. Use <table>, <tr>, <th>, and <td> to create tables.",
    instructions: "Create a table with two columns (Name, Age) and three rows of data.",
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>HTML Tables</title>
  </head>
  <body>
    <!-- Add your table here -->
  </body>
</html>`,
    expectedOutput: function (code) {
      return (
        code.includes("<table>") &&
        code.includes("<tr>") &&
        code.includes("<th>") &&
        code.includes("<td>") &&
        (code.match(/<tr>/g) || []).length >= 3
      );
    },
    hints: [
      "Use <table> to create a table.",
      "Use <tr> for table rows.",
      "Use <th> for table headers and <td> for table data.",
    ],
    validationRules: [
      {
        pattern: /<table>/i,
        message: "Include a <table> element.",
      },
      {
        pattern: /<th>/i,
        message: "Include at least one <th> element for headers.",
      },
      {
        pattern: /<td>/i,
        message: "Include at least two <td> elements for data.",
      },
    ],
  },
  {
    id: 14,
    title: "Lists (Ordered and Unordered)",
    explanation: "HTML lists are used to group related items. Use <ul> for unordered lists and <ol> for ordered lists.",
    instructions: "Create an unordered list of your favorite fruits and an ordered list of steps to make a sandwich.",
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>HTML Lists</title>
  </head>
  <body>
    <!-- Add your lists here -->
  </body>
</html>`,
    expectedOutput: function (code) {
      return (
        code.includes("<ul>") &&
        code.includes("<ol>") &&
        (code.match(/<li>/g) || []).length >= 5
      );
    },
    hints: [
      "Use <ul> for unordered lists.",
      "Use <ol> for ordered lists.",
      "Use <li> for list items.",
    ],
    validationRules: [
      {
        pattern: /<ul>/i,
        message: "Include an unordered list.",
      },
      {
        pattern: /<ol>/i,
        message: "Include an ordered list.",
      },
      {
        pattern: /<li>/i,
        message: "Include at least five <li> elements.",
      },
    ],
  },
  {
    id: 15,
    title: "Semantic HTML",
    explanation: "Semantic HTML uses meaningful tags like <header>, <footer>, and <article> to improve accessibility and SEO.",
    instructions: "Create a webpage with a <header>, <nav>, <main>, and <footer>.",
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Semantic HTML</title>
  </head>
  <body>
    <!-- Add semantic elements here -->
  </body>
</html>`,
    expectedOutput: function (code) {
      return (
        code.includes("<header>") &&
        code.includes("<nav>") &&
        code.includes("<main>") &&
        code.includes("<footer>")
      );
    },
    hints: [
      "Use <header> for the header section.",
      "Use <nav> for navigation links.",
      "Use <main> for the main content.",
      "Use <footer> for the footer section.",
    ],
    validationRules: [
      {
        pattern: /<header>/i,
        message: "Include a <header> element.",
      },
      {
        pattern: /<nav>/i,
        message: "Include a <nav> element.",
      },
      {
        pattern: /<main>/i,
        message: "Include a <main> element.",
      },
      {
        pattern: /<footer>/i,
        message: "Include a <footer> element.",
      },
    ],
  },
];