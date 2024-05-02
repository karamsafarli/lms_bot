require('dotenv').config();
// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer');


const scrapeLMS = async (username, password) => {
    const browser = await puppeteer.launch({ headless: true })
    // const browser = await puppeteer.launch({
    //     ignoreHTTPSErrors: true,
    //     args: [
    //         "--proxy-server='direct://'",
    //         '--proxy-bypass-list=*',
    //         '--disable-gpu',
    //         '--disable-dev-shm-usage',
    //         '--disable-setuid-sandbox',
    //         '--no-first-run',
    //         '--no-sandbox',
    //         '--no-zygote',
    //         '--single-process',
    //         '--ignore-certificate-errors',
    //         '--ignore-certificate-errors-spki-list',
    //         '--enable-features=NetworkService'
    //     ],
    //     headless: true,
    //     executablePath:
    //         process.env.NODE_ENV === "production"
    //             ? process.env.PUPPETEER_EXECUTABLE_PATH
    //             : await require('puppeteer').executablePath(),
    // });
    const page = await browser.newPage();
    // page.setDefaultTimeout(60000)
    await page.goto('http://lms.adnsu.az/adnsuEducation/login.jsp');
    await page.waitForSelector('#username')
    await page.type('#username', username);
    await page.type('#password', password);
    await page.keyboard.press('Enter')
    await page.waitForNavigation();

    const title = await page.title();
    console.log(title)

    await page.waitForSelector('#sidebar > div > ul.nav > ul > li:nth-child(2) > a')
    await page.evaluate(() => {
        document.querySelector('#sidebar > div > ul.nav > ul > li:nth-child(2) > a').click()
    })
    await page.waitForNavigation();


    await page.waitForSelector('.panel-group .widget.widget-state')
    const subjectLength = (await page.$$('.panel-group .widget.widget-state')).length

    const allData = [];

    for (let i = 0; i < subjectLength; i++) {
        await page.waitForSelector('.panel-group .widget.widget-state')
        const subjects = await page.$$('.panel-group .widget.widget-state')
        await page.waitForSelector('.panel-group .widget.widget-state')
        subjects[i].evaluate((sub) => {
            sub.querySelector('.state-link a').click();
        })

        const isLastPage = i === subjectLength - 1;
        const subjectData = await scrapeEachSubject(page, isLastPage)
        allData.push(subjectData);

    }


    await browser.close()

    return allData;
}


const scrapeEachSubject = async (page, isLastPage) => {

    await page.waitForSelector('#accordionDiv > div.col-md-12.mob-fix > ul > li:nth-child(5) a')
    await page.evaluate(() => {
        document.querySelector('#accordionDiv > div.col-md-12.mob-fix > ul > li:nth-child(5) a').click();
    })

    await page.waitForSelector('ul.nav-pills li:nth-child(2) > a')
    await page.evaluate(() => document.querySelector('ul.nav-pills li:nth-child(2) > a').click())

    await page.waitForSelector('#journal-2 > div > div > a')
    await page.evaluate(() => document.querySelector('#journal-2 > div > div > a').click())

    await page.waitForSelector('#resultJournal tbody tr')
    const tableData = await page.evaluate(() => {
        const tableRow = document.querySelector('#resultJournal tbody tr');
        const data = [];

        tableRow.querySelectorAll('td').forEach(cell => {
            data.push(cell.innerText.trim());
        });

        return data;
    });

    await page.waitForSelector('#content h1.page-header.page-header-bg')
    const subjectName = await page.evaluate(() => document.querySelector('#content .page-header.page-header-bg')?.textContent)


    if (!isLastPage) {
        page.evaluate(() => document.querySelector('#accordionDiv > div.row.m-t-15 > div.col-md-4.col-xs-12.ui-sortable > div > a').click())
    }

    const collectedData = {
        'student': tableData[1],
        'subjectName': subjectName,
        'absence': tableData[3],
        'activity': tableData[4],
        'presentation': tableData[6],
        'lab': tableData[8],
        'quiz': tableData[9],
        'midterm': tableData[10],
        'pointsBeforeExam': tableData[11],
        'examPoint': tableData[12],
        'totalPoint': tableData[13],
        'totalPointLetter': tableData[14]
    }

    return collectedData
}

module.exports = scrapeLMS