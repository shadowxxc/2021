
// window.res =[]
// for (let index = 0; index < data.entries.length; index++) {
//   const e = data.entries[index].response.content;
//   if (e.mimeType === 'application/json') {
//     let data = e.text
//     if (e.encoding === 'base64') {
//       data = Base64.decode(data);
//     }
//     res = [...res, ...JSON.parse(data)]
//   }
// }
// console.log(JSON.stringify(res));

// window.title = ''
// window.detail = ''
// for (let index = 0; index < res.length; index++) {
//   const element = res[index];

//   window.title += element.prizename
//   window.detail += element.detail
// }
// console.log(title);
// // console.log(detail);

// type: 1:递增， 2：递减
function sortByMoney(data, min, max, type) {
  let sortArr =[]
  for (let i = 0; i < data.length; i++) {
    let price = Number(data[i].money);
    data[i].money = price
    if (price >= min && price <= max) {
      sortArr.push(data[i])
    }
  }

  if (type === 1) {
    sortArr = sortArr.sort(function(a,b){
      return a.money - b.money;
    })  
  }else{
    sortArr = sortArr.sort(function(a,b){
      return b.money - a.money;
    })  
  }
  console.log(sortArr);
  return sortArr
}


function search(data, searchText) {
  let searchArr =[]
  for (let i = 0; i < data.length; i++) {
    let text = data[i].title + data[i].groupname;
    if (text.indexOf(searchText) > -1) {
      searchArr.push(data[i])
    }
  }

  console.log(searchArr);
  return searchArr
}

function searchAllWord(data) {
  let searchArr =[]
  for (let index = 0; index < word.length; index++) {
    const element = word[index];
    for (let i = 0; i < data.length; i++) {
      let text = data[i].title + data[i].groupname;
      if (text.indexOf(element) > -1) {
        searchArr.push(data[i])
      }
    }
  }
  searchArr = Array.from(new Set(searchArr))
  console.log(searchArr);

  return searchArr
}

function filter(data) {
  let finish = localStorage.getItem('finish'); 
  finish = JSON.parse(finish) || []

  let del = localStorage.getItem('del'); 
  del = JSON.parse(del) || []
  
  let filArr = [...del,...finish]

  for (let i = 0; i < data.length; i++) {
    let earnid = data[i].earnid
    if (filArr.indexOf(earnid) > -1) {
      data.splice(i,1)
    }
  }

  return data
}

function byUser(data) {
  let end = []
  for (let i = 0; i < data.length; i++) {
    let uid = data[i].uid
    if (useridAll.indexOf(uid) > -1) {
      end.push(data[i])
    }
  }

  return end
}



