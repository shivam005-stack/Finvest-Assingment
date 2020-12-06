const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');


const blog = "https://medium.com/hackernoon/the-future-of-cyber-security-in-the-fintech-era-78b9d7f7c0f0";

(
    async() => {
    let mediumData = [];
    const res = await request({
         uri:blog,
         headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
         },
         gzip:true
    })
      let $ = cheerio.load(res)
      let creator = $('div[class="gt n o gu"] > span').text();
      let title = $('h1').text();
      let details = $('span [class="at b au av bw gv bv gw gx gy gz aw"]').text();
      let blogContent= $('div[class="n p"] > div > p').each((el,i)=>{
           let Blog = $(i).text().trim();
      });
      let response = $('div[class="vp"]').text();
         mediumData.push({
             creator,
             title,
             details,
             blogContent,
             response
         }); 
             fs.writeFileSync("medium.xlsx",JSON.stringify(res.mediumData),function(err){
                  if(err){
                        console.log(err);
                  } else{
                        console.log("Data Generated");
                  }
             })
}
) ();