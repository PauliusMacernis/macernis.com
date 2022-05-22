// import fs from "fs";
const fs = require('fs');

const requestHandler = (req, res) => {

    fs.appendFileSync('access.log', new Date().toISOString() + ' ' + JSON.stringify(req.url) + '\n');

    const method = req.method;
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')

    const body = [];

    switch (req.url) {
        case '/users':
            return res.end('<h1>Users</h1><ul><li>User#1</li><li>User#2</li></ul>');

        case '/user-login':
            if(req.method !== 'POST') {
                throw new Error('Only POST requests are allowed. Yours is: ' + req.method);
            }

            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const reqData = parsedBody.split('&');

                const reqEmail = reqData.find((value) => {
                    if(value.startsWith('email=')) {
                        return true;
                    }
                });
                const email = reqEmail.split('=')[1];

                console.log(parsedBody, 'Logging ' + email + ' in');

                return res.end();
            });


            return res.end('Logging in... TBD.');

        case '/user-create':
            if(req.method !== 'POST') {
                throw new Error('Only POST requests are allowed. Yours is: ' + req.method);
            }

            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const reqData = parsedBody.split('&');

                const reqEmail = reqData.find((value) => {
                    if(value.startsWith('email=')) {
                        return true;
                    }
                });
                const email = reqEmail.split('=')[1];

                console.log(parsedBody, 'Creating the new user: ' + email);

                return res.end();
            });


            return res.end('Creating the new user... TBD.');

        case '/time':
            return res.end('That is where the info about my time management goes.');

        case '/message':
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>Write a message</title></head>');
            res.write('<body>' +
                '<form action="/message-post-action" method="post">' +
                '<p>That is where you may drop an email message to me.</p>' +
                '<input type="text" name="message">' +
                '<input type="submit" value="Send">' +
                '</form>' +
                '</body>');
            res.write('</html>');
            return res.end();

        case '/message-post-action':
            if(method !== 'POST') {
                throw Error('Only POST type requests are allowed, yours is "' + method + '"');
            }

            // const body = [];
            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                fs.appendFile('access.log', new Date().toISOString() + ' ' + JSON.stringify(req.url) + ' ' + message + '\n', err => {

                    if(err) {
                        throw err;
                    }

                    res.statusCode = 302;
                    res.setHeader('Location', '/message');
                });

                return res.end();
            });

        default:
            return res.end(
                '<!DOCTYPE html>\n' +
                '<html lang="en">\n' +
                '<head>\n' +
                '    <meta charset="UTF-8">\n' +
                '    <title>macernis.com</title>\n' +
                '    <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
                '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
                '    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">\n' +
                '    <style>\n' +
                '        body {\n' +
                '            text-align: center;\n' +
                '            /*background-color: #5461E8;*/\n' +
                '            background-color: #fff;\n' +
                '            color: dimgray;\n' +
                '            font-family: \'Roboto\', sans-serif;\n' +
                '            padding: 0;\n' +
                '            margin: 0;\n' +
                '        }\n' +
                '        header, footer {\n' +
                '            padding: 13rem 0 8rem 0;\n' +
                '            /*padding-top: 3rem;*/\n' +
                '            /*padding-bottom: 0.7rem;*/\n' +
                '            font-weight: bold;\n' +
                '            font-size: 2rem;\n' +
                '            color: white;\n' +
                '            background-color: black;\n' +
                '            /*min-height: 100%;*/\n' +
                '            min-width: 100%;\n' +
                '            text-shadow: 0px 0px 8px #fff;\n' +
                '            /*text-transform: capitalize;*/\n' +
                '        }\n' +
                '        footer {\n' +
                '            font-size: 1rem;\n' +
                '        }\n' +
                '        ul li {\n' +
                '            padding: 1rem;\n' +
                '            margin: 0;\n' +
                '        }\n' +
                '        .slogan {\n' +
                '            font-size: 1rem;\n' +
                '            color: black;\n' +
                '            background: white;\n' +
                '            /*background-image: url("./images/_1a_500.0_901_676_mv_SubFlame_1944165122_0120.png");*/\n' +
                '            text-shadow: 0px 0px 5px #000;\n' +
                '            padding: 5rem 0 3rem 0;\n' +
                '            text-transform: capitalize;\n' +
                '        }\n' +
                '        .slogan-container {\n' +
                '            width: 80%;\n' +
                '            display: inline-block;\n' +
                '            text-align: justify;\n' +
                '            font-size: 0.9rem;\n' +
                '        }\n' +
                '        .about {\n' +
                '            font-size: 1rem;\n' +
                '            color: white;\n' +
                '            background: black;\n' +
                '            /*background-image: url("./images/_1a_500.0_901_676_mv_SubFlame_1944165122_0120.png");*/\n' +
                '            text-shadow: 0px 0px 5px #000;\n' +
                '            padding: 2rem 0 1rem 0;\n' +
                '        }\n' +
                '        .menu {\n' +
                '            color: black;\n' +
                '            background-color: white;\n' +
                '            border-top: dimgray 1px dashed;\n' +
                '            border-bottom: dimgray 1px dashed;\n' +
                '        }\n' +
                '        .menu a {\n' +
                '            color: black;\n' +
                '        }\n' +
                '        .menu a:hover {\n' +
                '            color: black;\n' +
                '            text-decoration: none;\n' +
                '        }\n' +
                '        .menu ul {\n' +
                '            display: flex;\n' +
                '            flex-direction: row;\n' +
                '            flex-wrap: wrap;\n' +
                '            justify-content: flex-start;\n' +
                '            align-items: stretch;\n' +
                '            align-content: space-around;\n' +
                '        }\n' +
                '        .menu ul li {\n' +
                '            padding: 1rem;\n' +
                '            margin: 0;\n' +
                '            list-style-type: none;\n' +
                '        }\n' +
                '        .menu ul li:hover {\n' +
                '            background: lightgrey;\n' +
                '\n' +
                '        }\n' +
                '        .menu ul li a img {\n' +
                '            /*width: 250px;*/\n' +
                '            height: 200px;\n' +
                '            /*display: block;*/\n' +
                '            padding: 10px;\n' +
                '        }\n' +
                '        .menu ul li a span {\n' +
                '            display: block;\n' +
                '            padding: 10px;\n' +
                '        }\n' +
                '\n' +
                '        .motivation {\n' +
                '            font-weight: bold;\n' +
                '            padding: 3rem 0rem;\n' +
                '        }\n' +
                '\n' +
                '        .motivation header {\n' +
                '            padding: 13rem 0 8rem 0;\n' +
                '            /*padding-top: 3rem;*/\n' +
                '            /*padding-bottom: 0.7rem;*/\n' +
                '            font-weight: bold;\n' +
                '            font-size: 2rem;\n' +
                '            color: white;\n' +
                '            background-color: black;\n' +
                '            /*min-height: 100%;*/\n' +
                '            min-width: 100%;\n' +
                '        }\n' +
                '\n' +
                '        .motivation .intro {\n' +
                '            padding: 3rem 2rem 3rem 1rem;\n' +
                '            font-weight: bold;\n' +
                '            text-transform: capitalize;\n' +
                '        }\n' +
                '\n' +
                '        .motivation .key-points {\n' +
                '            padding: 3rem 2rem 3rem 1rem;\n' +
                '            /*padding-top: 3rem;*/\n' +
                '            /*padding-bottom: 0.7rem;*/\n' +
                '            /*font-weight: bold;*/\n' +
                '            font-size: 0.8rem;\n' +
                '            color: black;\n' +
                '            background-color: white;\n' +
                '            /*min-height: 100%;*/\n' +
                '            text-align: left;\n' +
                '        }\n' +
                '        .motivation .key-points li {\n' +
                '            list-style-type: none;\n' +
                '            font-weight: normal;\n' +
                '        }\n' +
                '        .decision-what {\n' +
                '            padding: 0 1rem 0 0;\n' +
                '            font-weight: bold;\n' +
                '        }\n' +
                '        .decision-why {\n' +
                '        }\n' +
                '        hr.authentication-separator {\n' +
                '            margin: 8rem 0 5rem 0;\n' +
                '        }' +
                '\n' +
                '    </style>\n' +
                '</head>\n' +
                '<body>\n' +
                '    <header>Paulius Macernis</header>\n' +
                '    <div class="slogan">\n' +
                '<!--        Thoughts appear > A good one is selected > Well maintained thought becomes a vision > The skillfully expressed Vision relates to people > The most attracted people unites for adoption > The successful adoption of majority is embedded into the culture > Well funded advantageous culture overlasts individuals, including me-->\n' +
                '\n' +
                '<!--        Thought appears (meditate), Vision sparks (wonder), Will expresses (act), Vison unites (care), Work makes life different (enjoy)-->\n' +
                '<!--        Building this website with the intention to optimize my own life.-->\n' +
                '<!--        Life is too short to improve the self only, improve everlasting instead. Good luck with that!-->\n' +
                '<!--        Life is too short to improve the self only-->\n' +
                '<!--        Societies, communities, cultures, art, experiences, inventions, ... will last much longer.<br>-->\n' +
                '<!--        Enhancing collective memory and structures has the real impact on the purpose of shortly being alive.<br>-->\n' +
                '<!--        It is hard, it takes errors on the way, I do sometimes forgot what\'s important. But I do try to make the world <abbr title="What is the meaning of \'a better\'? It\'s evaluating at least two options put on your plate for a moment of being and taking the better one only. And going for the \'what new to consume\' again.">a better</abbr> place after me.<br>-->\n' +
                '    </div>\n' +
                '<!--    <div class="about">-->\n' +
                '<!--        Working as hard as I possibly can on at least one thing to see what happens.-->\n' +
                '<!--&lt;!&ndash;        Life is too short to improve the self only.&ndash;&gt;-->\n' +
                '<!--        &lt;!&ndash;        Life is too short to improve the self only.<br>&ndash;&gt;-->\n' +
                '<!--        &lt;!&ndash;        Societies, communities, cultures, art, experiences, inventions, ... will last much longer.<br>&ndash;&gt;-->\n' +
                '<!--        &lt;!&ndash;        Enhancing collective memory and structures has the real impact on the purpose of shortly being alive.<br>&ndash;&gt;-->\n' +
                '<!--        &lt;!&ndash;        It is hard, it takes errors on the way, I do sometimes forgot what\'s important. But I do try to make the world <abbr title="What is the meaning of \'a better\'? It\'s evaluating at least two options put on your plate for a moment of being and taking the better one only. And going for the \'what new to consume\' again.">a better</abbr> place after me.<br>&ndash;&gt;-->\n' +
                '<!--    </div>-->\n' +
                '    <div class="menu flex-container">\n' +
                '        <ul>\n' +
                '            <li>\n' +
                '                <!-- Calendly link widget begin -->\n' +
                '                <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">\n' +
                '                <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>\n' +
                '                <!-- Calendly link widget end -->\n' +
                '                <a href="" onclick="Calendly.initPopupWidget({url: \'https://calendly.com/pauliusm\'});return false;" title="The timeframe you book will get into my calendar. I tend to check it daily." target="_blank">\n' +
                '                    <img src="images/s-b-vonlanthen-D75_5tWZDQ4-unsplash.jpg" title="Photo by S&B Vonlanthen on Unsplash">\n' +
                '                    <span>\n' +
                '                        Book my Time\n' +
                '                    </span>\n' +
                '                </a>\n' +
                '            </li>\n' +
                '\n' +
                '            <li>\n' +
                '                <a href="https://calendar.google.com/calendar/embed?src=sugalvojau%40gmail.com&ctz=Europe%2FVilnius" title="My calendar #1" target="_blank">\n' +
                '                    <img src="images/joakim-honkasalo-GZa4QFmv0Zg-unsplash.jpg" title="Photo by Joakim Honkasalo on Unsplash">\n' +
                '                    <span>My calendar #1 (read-only)</span>\n' +
                '                </a>\n' +
                '            </li>\n' +
                '\n' +
                '            <li>\n' +
                '                <a href="https://calendar.google.com/calendar/embed?src=paulius.macernis%40interactio.io&ctz=Europe%2FVilnius" title="My calendar #2" target="_blank">\n' +
                '                    <img src="images/ashley-anthony-SrAnT6OtADY-unsplash.jpg" title="Photo by Ashley Anthony on Unsplash">\n' +
                '                    <span>My calendar #2 (read-only)</span>\n' +
                '                </a>\n' +
                '            </li>\n' +
                '\n' +
                '\n' +
                '\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="" title="Location" target="_blank">-->\n' +
                '<!--                    <img src="images/blake-wisz-TcgASSD5G04-unsplash.jpg" title="Photo by Blake Wisz on Unsplash">-->\n' +
                '<!--                    <span>Current location</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="" title="Health" target="_blank">-->\n' +
                '<!--                    <img src="images/hybrid-uGP_6CAD-14-unsplash.jpg" title="Photo by Hybrid on Unsplash">-->\n' +
                '<!--                    <span>How do I feel now</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="#" title="TBD" target="_blank">-->\n' +
                '<!--                    <img src="images/samantha-lam-zFy6fOPZEu0-unsplash.jpg" title="Photo by Samantha Lam on Unsplash">-->\n' +
                '<!--                    <span>Valuable Skills / Advantageous help</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="#" title="TBD" target="_blank">-->\n' +
                '<!--                    <img src="images/martin-adams-fmCOUAj1QHk-unsplash.jpg" title="Photo by Martin Adams on Unsplash">-->\n' +
                '<!--                    <span>Talents / Natural help</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="#" title="TBD" target="_blank">-->\n' +
                '<!--                    <img src="images/romain-dancre-doplSDELX7E-unsplash.jpg" title="Photo by Romain Dancre on Unsplash">-->\n' +
                '<!--                    <span>Privileges / Permitted help</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="#" title="TBD" target="_blank">-->\n' +
                '<!--                    <img src="images/clay-banks-cEzMOp5FtV4-unsplash.jpg" title="Photo by Clay Banks on Unsplash">-->\n' +
                '<!--                    <span>Tools / Helpful artificial extensions</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="#" title="TBD" target="_blank">-->\n' +
                '<!--                    <img src="images/max-bender-ILdRh89btig-unsplash.jpg" title="Photo by Max Bender on Unsplash">-->\n' +
                '<!--                    <span>Speaking the mind out to the world</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="https://www.selfauthoring.com/past-authoring" title="Develop a clearer sense of my past, by writing my own story">-->\n' +
                '<!--                    <img src="images/alex-knight-2EJCSULRwC8-unsplash.jpg" title="Photo by Alex Knight on Unsplash">-->\n' +
                '<!--                    &lt;!&ndash;                    <img src="images/_1a_500.0_901_676_mv_SubFlame_1944165122_0120.png">&ndash;&gt;-->\n' +
                '<!--                    <span>Autobiography / Who was I for You</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '<!--            <li>-->\n' +
                '<!--                <a href="#" title="TBD" target="_blank">-->\n' +
                '<!--                    <img src="images/george-bakos-VDAzcZyjun8-unsplash.jpg" title="Photo by George Bakos on Unsplash">-->\n' +
                '<!--                    <span>Todo list / Our future options</span>-->\n' +
                '<!--                </a>-->\n' +
                '<!--            </li>-->\n' +
                '        </ul>\n' +
                '    </div>\n' +
                '    <div class="slogan">\n' +
                '    </div>\n' +
                '<!--    <section class="motivation">-->\n' +
                '<!--        <header>Motivation</header>-->\n' +
                '<!--        <div class="intro">-->\n' +
                '<!--            Letting the brightest ideas to reach out and spread the world.-->\n' +
                '<!--        </div>-->\n' +
                '<!--        <ul class="key-points">-->\n' +
                '<!--            <li><span class="decision-what">Language</span><span class="decision-why">My native language isn\'t English. But I choose to create the content in English in order to reach out to the English-speaking community and the people who are not native English speakers but have put enough effort to understand and be beyond the given "status quo" environment. There are plenty of material in any(?) language in the world to learn English from nowadays. Sure, there are lots of beautiful and worth-learning languages, and I do put my effort to learn a word or a few in another languages as well. It is so for now, improvements awaits.</span></li>-->\n' +
                '<!--            <li><span class="decision-what">Country</span><span class="decision-why">I am a supporter of a global community, and a world-wide good. There are no borders in my mind in regard to countries, so I am willing to live in a world, not in a country. Regions have different dominant culture and landscape, that\'s acceptable. All the existing differences makes the world well suited for almost(?) any person who is willing to live surrounded by like-minded people in the well-suited community and the most attractive corner of the world. This way a person is bound to be the happiest and is bound to achieve the most during the lifetime. It\'s worth mentioning, I truly respect and admire the ones who have reached the level to be able to resonate with the most of the population, that\'s an amazing level of integration. By the way, I like lakes, forests and mountains for some reason.</span></li>-->\n' +
                '<!--            <li><span class="decision-what">Direction</span><span class="decision-why">When it comes to choosing which way to go, I choose the direction of improving the everlasting. I know, there are lots of debates on what lasts longer but this kind of debate is also the part of my moving through the life. I decide while moving, otherwise I would stay in halt for the lifetime. For example, I do think culture lasts longer than a human being. Therefore, improving the culture makes more sense for me now. I am open to communication and willing to change the mind, whichever wrong direction I am directed towards for now, you have a chance to change it when we meet. To note, self-sustainability looks fitting the definition of everlasting quite well.</span></li>-->\n' +
                '<!--            <li><span class="decision-what">Creature</span><span class="decision-why">I do want to help for all living beings, including humans. Maybe I do have too strong kind of imagination, but I do treat animals as quite equal living beings, also trees, elements like fire, water, air, ... and you would probably laugh at me, but here it is - I do also think thoughts are alive too. And for every of the mentioned and not I think I may help to prosper in one or another way. When you know it is alive, you cultivate the respect and empathy towards the one. Therefore, you may find me in quite a situation, e.g. taking a bow towards a fireplace, an empty room, a stone, etc. Yeah, each of us have some wiredness, hope to know yours well too.</span></li>-->\n' +
                '<!--            <li><span class="decision-what">Rest</span><span class="decision-why">As someone has said once, and I agree with: a pause is the part of a song. Sometimes it is required to stop and pass the unwanted thoughts by while waiting for the truly wanted ones to come. I know I don\'t need to consume each ad and become a thing, so it\'s quite important to hit a pause at the moments the inertia of the unwanted starts to accumulate to the out-of-control levels. That\'s just safety measures for life, my friend.</span></li>-->\n' +
                '<!--            <li><span class="decision-what">Action</span><span class="decision-why">Do it, otherwise it\'s not done yet.</span></li>-->\n' +
                '<!--        </ul>-->\n' +
                '\n' +
                '<!--&lt;!&ndas  h;            <p><span class="datetime">2022-05-10 23:15</span>Venenatis tellus in metus vulputate. Etiam dignissim diam quis enim lobortis scelerisque. Ultricies mi eget mauris pharetra et. Facilisis sed odio morbi quis commodo. Feugiat vivamus at augue eget arcu dictum varius duis at. Dignissim diam quis enim lobortis scelerisque fermentum. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor. Lectus vestibulum mattis ullamcorper velit sed. Fringilla est ullamcorper eget nulla facilisi. Elementum eu facilisis sed odio morbi quis. Diam maecenas sed enim ut sem. Commodo viverra maecenas accumsan lacus vel facilisis volutpat.</p>&ndash;&gt;-->\n' +
                '<!--        </div>-->\n' +
                '<!--    </section>-->\n' +
                '    <footer>\n' +
                '        <div class="slogan-container">\n' +
                '            Tweaking my personal life environment by providing solutions up to the level of recognized advantage.<br/>\n' +
                '<!--            The advantage manifests itself when somebody else is expressing a will to path own life with any of the solutions presented.<br/>-->\n' +
                '            The point is to lead by example - to present solutions that:\n' +
                '            <ul>\n' +
                '                <li>works well for me,</li>\n' +
                '                <li>works well for my family and a hundred of friends,</li>\n' +
                '                <li>works well for millions of others after applying a little more effort,</li>\n' +
                '                <li>improves life experience of <a href="/users">all users</a>.</li>\n' +
                '            </ul>\n' +
                '            Therefore, finally it\'s all about improvement the life of ours.<br/>\n' +
                '            <hr class="authentication-separator">\n' +
                '            <form action="/user-login" method="post">\n' +
                '                <h2>Login:</h2>\n' +
                '                <input type="text" name="email" value=""> Email<br>\n' +
                '                <input type="password" name="password" value=""> Password<br>\n' +
                '                <input type="submit" value="Login">\n' +
                '            </form>\n' +
                '            <form action="/user-create" method="post">\n' +
                '                <h2>Create new user:</h2>\n' +
                '                <input type="text" name="email" value=""> Email<br>\n' +
                '                <input type="password" name="password" value=""> Password<br>\n' +
                '                <input type="submit" value="Create New User">\n' +
                '            </form>\n' +
                '        </div>\n' +
                '<!--        P.S. Dear creator, please do not edit this line anymore. It is better to release the good enough than to not release the best ever.-->\n' +
                '    </footer>\n' +
                '</body>\n' +
                '</html>'
            );
    }
}

module.exports = requestHandler;