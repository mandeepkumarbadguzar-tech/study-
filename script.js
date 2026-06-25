const sheetURL="https://docs.google.com/spreadsheets/d/1L62sF4VnwaZOjR1KKZ_dQK_e8Rc93HxB0Qo1RzrhOdI/gviz/tq?tqx=out:csv&sheet=Sheet1";

async function searchStudent(){

  let name=document.getElementById("name").value.toLowerCase();
  let dob=document.getElementById("dob").value;

  if(!name && !dob){
    document.getElementById("result").innerHTML="Please enter name or date of birth to search.";
    return;
  }

  // convert yyyy-mm-dd to d/m/yyyy
  let d = "";
  if(dob){
    const p=dob.split("-");
    if(p.length===3){ d = p[2]+"/"+p[1]+"/"+p[0]; }
  }

  let res=await fetch(sheetURL).catch(err => null);
  if(!res){
    document.getElementById("result").innerHTML="Could not fetch sheet. Make sure the Google Sheet is published or public.";
    return;
  }

  let text=await res.text();
  let rows=text.split("\n");

  for(let i=1;i<rows.length;i++){
    if(!rows[i].trim()) continue;
    // basic CSV split - will fail on commas inside fields
    let c=rows[i].split(",");

    const rowName = (c[0]||"").toLowerCase();
    const rowDob = (c[1]||"").trim();

    const nameMatch = name ? rowName==name : true;
    const dobMatch = d ? rowDob==d : true;

    if(nameMatch && dobMatch){
      document.getElementById("result").innerHTML=
        "<h3>"+c[0]+"</h3><p>"+c[1]+"</p><p>"+c[2]+"</p><p>"+c[3]+"</p><p>"+c[4]+"</p>";
      return;
    }
  }

  document.getElementById("result").innerHTML="Not Found";
}
