const rp = require('request-promise');
it("test api", async () => {
    rp('http://localhost:3000/api/get_structure')
        //@ts-ignore
        .then((htmlString)=> {
            console.log('TETETETETETTETEETTE',htmlString)
        })
        //@ts-ignore
        .catch((err)=> {
            // Crawling failed...
        });
    await page.waitForTimeout(7000);
}, 90000);
