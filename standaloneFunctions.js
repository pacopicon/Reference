const hashObj = (data) => {

  const stringifyAndChainData = (data) => {

    let t = {s:'string',n:'number',b:'boolean',o:'object',f:'function',u:'undefined'},
    payload = ''
  
    const stringify = (datum) => {
      let pf = typeof datum
      if (datum === null) {
        return 'null'
      } else if (Array.isArray(datum)) {
        return stringifyArr(datum)
      } else if (pf === t.n || pf === t.b) {
        return datum.toString()
      } else if (pf === t.u) {
        return t.u
      } else if (pf === t.o) {
          return stringifyAndChainData(datum)
      } else {
        return datum
      }
    }
  
    const stringifyArr = (arr) => {
      let strArr = [],
        len = arr.length
      for (let i=0; i<len; i++) {
        let el = arr[i]
        if (typeof el !== 'string') {
          el = stringify(el)
        }  
        strArr.push(el)
      }
      return '[' + strArr.join() + ']'
    }
  
    const stringifyObj = (obj) => {
      let keys = Object.keys(data),
      kLen = keys.length,
      tally = -1,
      vals = Object.values(data)
    
      for (let property in data) {
        tally++
        let strProp = stringify(data[property])
  
        if (tally === 0) {
          payload += '{'
        }
  
        for (let i=0; i<kLen; i++) {
          if (i === tally) {
            payload += `${keys[i]}: `
          } 
        }
  
        payload += strProp
        
        if (tally === vals.length-1) {
          payload += '}'
        } else {
          payload += ', '
        }
      }
  
    }
  
    if (typeof data === t.o && !Array.isArray(data)) {
      stringifyObj(data)
    } else if (Array.isArray(data)) {
      payload += stringifyArr(data)
    } else {
      return stringify(data)
    }
  
    return btoa(payload)
  }

  let packaged = stringifyAndChainData(data)

  return btoa(packaged)

}