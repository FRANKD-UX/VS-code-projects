const lessons = [
  {
    id: 1,
    title: "HTML Document Structure",
    explanation: "Think of an HTML document like a sandwich. The `<!DOCTYPE html>` is the bread at the bottom—it tells the browser, 'Hey, this is an HTML5 document!' The `<html>` tag is the top bread, wrapping everything inside. Inside the sandwich, you have two main layers: the `<head>` (where you put stuff like the title and meta tags) and the `<body>` (where all the visible content goes).\n\n**Here’s how you write it**:\n- Start with `<!DOCTYPE html>` to declare the document type.\n- Wrap everything in `<html>` and `</html>` tags.\n- Inside `<html>`, add a `<head>` section (for metadata) and a `<body>` section (for content).\n- Don’t forget to close each tag with `</tagName>`!",
    instructions: "Create a basic HTML document with a DOCTYPE declaration, html, head, and body elements. Inside the head, add a title element with 'My Resume' as its content.",
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
        code.includes("My Resume") &&
        code.includes("</title>")
      );
    },
    hints: [
      "Start with <!DOCTYPE html> to declare the document type.",
      "Add opening and closing <html> tags that contain the entire document.",
      "Within the html tags, add <head> and <body> sections.",
      "Inside the head section, add <title>My Resume</title>.",
    ],
    validationRules: [
      {
        pattern: /<!DOCTYPE html>/i,
        message: "Make sure to include the DOCTYPE declaration.",
      },
      {
        pattern: /<html>[\s\S]*<\/html>/i,
        message: "Your document should include opening and closing html tags.",
      },
      {
        pattern: /<head>[\s\S]*<\/head>/i,
        message: "Your document should include a head section.",
      },
      {
        pattern: /<title>[\s\S]*My Resume[\s\S]*<\/title>/i,
        message: "Include a title element with 'My Resume' as content.",
      },
      {
        pattern: /<body>[\s\S]*<\/body>/i,
        message: "Your document should include a body section.",
      },
    ],
  },
  {
    id: 2,
    title: "Headings and Paragraphs",
    explanation: "Headings in HTML are like titles in a book. `<h1>` is the big, bold title of the chapter, while `<h2>` is a subheading, and so on. Paragraphs (`<p>`) are like the sentences in that chapter—they hold the main content.\n\n**Here’s how you write them**:\n- Use `<h1>` for the main heading and close it with `</h1>`.\n- Use `<h2>` for subheadings and close them with `</h2>`.\n- Use `<p>` for paragraphs and close them with `</p>`.\n\nRemember, most HTML tags come in pairs—an opening tag and a closing tag!",
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
      "Use <h1>About Me</h1> for the main heading.",
      "Use <h2>My Hobbies</h2> for the subheading.",
      "Add paragraphs using the <p> tag: <p>Your text here</p>.",
    ],
    validationRules: [
      {
        pattern: /<h1>[\s\S]*About Me[\s\S]*<\/h1>/i,
        message: "Include an h1 heading with 'About Me' as content.",
      },
      {
        pattern: /<h2>[\s\S]*My Hobbies[\s\S]*<\/h2>/i,
        message: "Include an h2 heading with 'My Hobbies' as content.",
      },
      {
        pattern: /<p>[\s\S]*<\/p>[\s\S]*<p>[\s\S]*<\/p>/i,
        message: "Include at least two paragraph elements.",
      },
    ],
  },
  {
    id: 3,
    title: "Links and Images",
    explanation: "Links (`<a>`) are like portals—they take you to another webpage when you click them. Images (`<img>`) are like posters you stick on your webpage to make it look cool.\n\n**Here’s how you write them**:\n- For links, use `<a href='URL'>Link Text</a>`. The `href` attribute tells the browser where to go when the link is clicked.\n- For images, use `<img src='imageURL' alt='Description'>`. The `src` attribute is the image URL, and the `alt` attribute describes the image (important for accessibility).\n\nNote: The `<img>` tag doesn’t need a closing tag—it’s self-closing!",
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
      "Use <h1>My Favorite Website</h1> for the heading.",
      'Add an image with <img src="image.jpg" alt="Description of image">.',
      'Create a link with <a href="https://example.com" target="_blank">Visit Example</a>.',
    ],
    validationRules: [
      {
        pattern: /<h1>[\s\S]*<\/h1>/i,
        message: "Include an h1 heading.",
      },
      {
        pattern: /<img[^>]+src=["'][^"']+["'][^>]*>/i,
        message: "Include an image with a src attribute.",
      },
      {
        pattern: /<img[^>]+alt=["'][^"']*["'][^>]*>/i,
        message: "Your image should have an alt attribute.",
      },
      {
        pattern: /<a[^>]+href=["'][^"']+["'][^>]*>/i,
        message: "Include a link with an href attribute.",
      },
      {
        pattern: /<a[^>]+target=["']_blank["'][^>]*>/i,
        message: 'Your link should have target="_blank" to open in a new tab.',
      },
    ],
  },
  {
    id: 4,
    title: "Radio Buttons and Checkboxes",
    explanation: "Radio buttons are like choosing your favorite ice cream flavor—you can only pick one! Checkboxes are like picking toppings for your pizza—you can choose as many as you want.\n\n**Here’s how you write them**:\n- For radio buttons, use `<input type='radio' name='groupName'>`. Use the same `name` attribute to group them together.\n- For checkboxes, use `<input type='checkbox'>`. Each checkbox can have its own `name`.\n\nDon’t forget to add a label using the `<label>` tag to make them user-friendly!",
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
    id: 5,
    title: "HTML Forms",
    explanation: "Forms are like surveys or sign-up sheets. You can ask for someone’s name, let them pick their favorite color from a dropdown, or even leave a comment in a text box.\n\n**Here’s how you write them**:\n- Use `<form>` to create a form.\n- Use `<input type='text'>` for text fields, `<select>` for dropdowns, and `<textarea>` for multi-line text.\n- Add a submit button with `<button type='submit'>`.\n\nRemember to close all tags properly!",
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
    id: 6,
    title: "HTML Tables",
    explanation: "Tables are like grids for organizing information. Think of a class schedule—each row is a different class, and each column is the time, subject, and room number.\n\n**Here’s how you write them**:\n- Use `<table>` to create a table.\n- Use `<tr>` for rows, `<th>` for headers, and `<td>` for data cells.\n- Don’t forget to close all tags!",
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
    id: 7,
    title: "Lists (Ordered and Unordered)",
    explanation: "Lists are like shopping lists or to-do lists. Unordered lists (`<ul>`) are for things where the order doesn’t matter (like groceries), and ordered lists (`<ol>`) are for steps or rankings (like a recipe).\n\n**Here’s how you write them**:\n- Use `<ul>` for unordered lists and `<ol>` for ordered lists.\n- Use `<li>` for each list item.\n- Close all tags properly!",
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
    id: 8,
    title: "Semantic HTML",
    explanation: "Semantic HTML is like labeling the rooms in your house. Instead of just saying 'room,' you say 'kitchen,' 'bedroom,' or 'living room.' This helps search engines and screen readers understand your webpage better.\n\n**Here’s how you write it**:\n- Use `<header>` for the header section.\n- Use `<nav>` for navigation links.\n- Use `<main>` for the main content.\n- Use `<footer>` for the footer section.\n\nRemember to close all tags properly!",
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
  {
    id: 9,
    title: "Multimedia (Images, Audio, Video)",
    explanation: "Multimedia is like adding music, videos, and pictures to your webpage. It’s what makes your site come alive!\n\n**Here’s how you write it**:\n- Use `<img>` for images.\n- Use `<audio>` for audio files.\n- Use `<video>` for video files.\n\nDon’t forget to include the `src` attribute to specify the file location!",
    instructions: "Add an image, an audio file, and a video to your webpage.",
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Multimedia</title>
  </head>
  <body>
    <!-- Add multimedia elements here -->
  </body>
</html>`,
    expectedOutput: function (code) {
      return (
        code.includes("<img") &&
        code.includes("<audio") &&
        code.includes("<video")
      );
    },
    hints: [
      'Use <img src="image.jpg" alt="Description"> for images.',
      'Use <audio src="audio.mp3" controls></audio> for audio.',
      'Use <video src="video.mp4" controls></video> for video.',
    ],
    validationRules: [
      {
        pattern: /<img[^>]+src=["'][^"']+["'][^>]*>/i,
        message: "Include an image with a src attribute.",
      },
      {
        pattern: /<audio[^>]+src=["'][^"']+["'][^>]*>/i,
        message: "Include an audio file with a src attribute.",
      },
      {
        pattern: /<video[^>]+src=["'][^"']+["'][^>]*>/i,
        message: "Include a video file with a src attribute.",
      },
    ],
  },
  {
    id: 10,
    title: "Meta Tags and SEO Basics",
    explanation: "Meta tags are like the 'behind-the-scenes' info for your webpage. They tell search engines what your page is about, so people can find it when they search online.\n\n**Here’s how you write them**:\n- Use `<meta name='description' content='Your page description'>` to describe your page.\n- Use `<meta name='keywords' content='your, keywords, here'>` to add keywords.\n- Use `<meta name='viewport' content='width=device-width, initial-scale=1.0'>` to make your page mobile-friendly.",
    instructions: "Add meta tags for description, keywords, and viewport to your webpage.",
    initialCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Meta Tags</title>
    <!-- Add meta tags here -->
  </head>
  <body>
    <!-- Your content goes here -->
  </body>
</html>`,
    expectedOutput: function (code) {
      return (
        code.includes("<meta name='description'") &&
        code.includes("<meta name='keywords'") &&
        code.includes("<meta name='viewport'")
      );
    },
    hints: [
      "Use <meta name='description' content='Your page description'>.",
      "Use <meta name='keywords' content='your, keywords, here'>.",
      "Use <meta name='viewport' content='width=device-width, initial-scale=1.0'>.",
    ],
    validationRules: [
      {
        pattern: /<meta name=["']description["']/i,
        message: "Include a meta tag for the page description.",
      },
      {
        pattern: /<meta name=["']keywords["']/i,
        message: "Include a meta tag for keywords.",
      },
      {
        pattern: /<meta name=["']viewport["']/i,
        message: "Include a meta tag for the viewport.",
      },
    ],
  },
];