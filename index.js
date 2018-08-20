const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');

async function intro() {
  let dayOfWeek = moment().format("dddd");
  let message = `Happy ${dayOfWeek}, @engineers! Here is the standup order for today:`;
  return message;
}

async function teamList() {
  let team = ["Adrian", "Agus", "Gabo", "Graham", "Greg", "Jen", "Joaco", "Maicol", "Mati", "Miguel", "Ricardo", "Santi", "Saurabh"];
  let sortedTeam = _.shuffle(team).join('\n');
  return sortedTeam;
}

async function randomColor() {
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

async function postToSlack() {
  await axios.post('https://hooks.slack.com/services/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', {
    text: await intro(),
    attachments: [
      {
        "text": await teamList(),
        "color": await randomColor(),
        "footer": "Join Standup Now ⏰  https://zoom.us/j/227908703",
      }
    ]
  });
}

exports.handler = async(event, context) => {
  await postToSlack();
}
