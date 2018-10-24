const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');

async function intro() {
  let dayOfWeek = moment().format("dddd");
  let message = `${process.env.TAGGED_USER}, Happy ${dayOfWeek}! Here is the standup order for today:`;
  return message;
}

async function teamList() {
  let team = process.env.TEAM_NAMES.split(" ");
  let sortedTeam = _.shuffle(team).join('\n');
  return sortedTeam;
}

async function randomColor() {
  return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}

async function postToSlack() {
  await axios.post(process.env.WEBHOOK_URL, {
    text: await intro(),
    attachments: [
      {
        "text": await teamList(),
        "color": await randomColor(),
        "fields": [
          {
            "title": "Teams:",
            "value": "1. What are we currently focused on? \n2. Are we on track for our deadline? \n3. Is there anything that others can do to help us?",
            "short": false
          },
          {
            "title": "Bug owners:",
            "value": "1. What is the expected resolution? \n2. When do I think I can complete this? \n3. Is there anything that others can do to help me?",
            "short": false
          }
        ],
        "footer": `Join Standup Now :alarm_clock: ${process.env.MEETING_URL}`
      }
    ]
  });
}

exports.handler = async(event, context) => {
  await postToSlack();
}
