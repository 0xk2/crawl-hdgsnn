const express = require('express');
const axios = require('axios');
const app = express();
const { parse } = require('node-html-parser');

const port = 9999;

const pagesCrawl = [
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2020_542',
    year: 2020,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2020-phan-2_545',
    year: 2020,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2020-phan-3_543',
    year: 2020,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2020-phan-4_544',
    year: 2020,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2021_659/',
    year: 2021,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2021-phan-2_658',
    year: 2021,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2021-phan-3_657',
    year: 2021,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2021-phan-4_656',
    year: 2021,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2022_687',
    year: 2022,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2022-phan-2_686/',
    year: 2022,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2022-phan-3_685/',
    year: 2022,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2022-phan-4_684/',
    year: 2022,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2023_762',
    year: 2023,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2023-phan-2_761',
    year: 2023,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2023-phan-3_760',
    year: 2023,
  },
  {
    url: 'http://hdgsnn.gov.vn/tin-tuc/danh-sach-ung-vien-duoc-hdgscs-de-nghi-xet-cong-nhan-dat-tieu-chuan-chuc-danh-gs-pgs-nam-2023-phan-4_759',
    year: 2023,
  },
];
const extractResearcher = (row, year) => {
  childNodes = row.childNodes;
  cvUrl = '';
  if (year === 2020) {
    if (
      childNodes[19].childNodes.length > 0 &&
      childNodes[19].childNodes[0].rawTagName === 'a'
    ) {
      cvUrl = childNodes[19].childNodes[0].getAttribute('href');
    }
    return {
      fullname: childNodes[3].rawText,
      dob: childNodes[5].rawText,
      gender: childNodes[7].rawText,
      researchField: childNodes[9].rawText,
      ethnic: childNodes[11].rawText,
      workingAt: childNodes[13].rawText,
      homeTown: childNodes[15].rawText,
      applyingTitle: childNodes[17].rawText,
      cvUrl,
    };
  } else {
    if (
      childNodes[17].childNodes.length > 0 &&
      childNodes[17].childNodes[0].rawTagName === 'a'
    ) {
      cvUrl = childNodes[17].childNodes[0].getAttribute('href');
    }
    return {
      fullname: childNodes[3].rawText,
      dob: childNodes[5].rawText,
      gender: childNodes[7].rawText,
      researchField: childNodes[9].rawText,
      ethnic: '',
      workingAt: childNodes[11].rawText,
      homeTown: childNodes[13].rawText,
      applyingTitle: childNodes[15].rawText,
      cvUrl,
    };
  }
};
const toCSV = (researchers) => {
  str = '';
  researchers.map((r) => {
    str +=
      r.fullname +
      ';' +
      r.dob +
      ';' +
      r.gender +
      ';' +
      r.researchField +
      ';' +
      r.ethnic +
      ';' +
      r.workingAt +
      ';' +
      r.homeTown +
      ';' +
      r.applyingTitle +
      ';' +
      r.evaluationBoard +
      ';' +
      r.applyingYear +
      ';' +
      r.cvUrl +
      '<br/>';
  });
  return str;
};
const crawlGsnn = async ({ page }) => {
  const response = await axios.get(page.url);
  const root = parse(response.data);
  const allData = root.querySelectorAll('div.noidung')[0];
  const evaluationBoards = [];
  const researchers = [];
  let field = 0;
  for (var i = 0; i < allData.childNodes.length; i++) {
    const item = allData.childNodes[i];
    itemTag = item.tagName;
    if (itemTag === 'P') {
      if (item.childNodes.length > 0) {
        strongTag = item.childNodes[0];
        if (strongTag.tagName === 'STRONG') {
          let rawText = strongTag.childNodes[0].textContent;
          let txtField = rawText.split('.')[1];
          if (txtField) {
            evaluationBoards.push(txtField.trim());
            field++;
          }
        }
      }
    } else if (itemTag === 'TABLE') {
      tbodyTag = item.childNodes[0];
      for (var j = 0; j < item.childNodes.length; j++) {
        if (item.childNodes[j].tagName === 'TBODY') {
          tbodyTag = item.childNodes[j];
          rows = tbodyTag.childNodes;
          rows.map((rw, idx) => {
            if (idx > 1 && rw.childNodes.length > 0) {
              researcher = extractResearcher(rw, page.year);
              researcher.evaluationBoard = evaluationBoards[field - 1];
              researcher.applyingYear = page.year;
              researchers.push(researcher);
            }
          });
        }
      }
    }
  }
  console.log(evaluationBoards);
  return researchers;
};

app.get('/crawl', async (req, res) => {
  let researchers = [];
  for (var i = 0; i < pagesCrawl.length; i++) {
    rs = await crawlGsnn({
      page: pagesCrawl[i],
    });
    console.log('i: ', i);
    researchers = [...researchers, ...rs];
  }
  const csv = toCSV(researchers);
  // res.attachment('hdgsnn.csv');
  // res.charset = 'utf-8';
  // res.status(200).send(csv);
  res.send(csv);
  // res.send('hello');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log('ready to crawl');
});
