const versionCheck = async function() {
  try{
    const res = await fetch('/LATEST_BUILD')
    if(res.status===200){
      const ver = await res.text()
      if (Date.now() - ver > 60000 && ver > process.env.buildVersion) location.reload();
    }
  }catch(e){}
}

export default () => {
  if(process.env.NODE_ENV !== 'production') return;
  setInterval(versionCheck, 60 * 60 * 1000)
}
