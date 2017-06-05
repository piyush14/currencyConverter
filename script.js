  // <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  // <script type="text/javascript">
// (function(){
window.onload = function(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
       if(dd<10){
              dd='0'+dd
          }
          if(mm<10){
              mm='0'+mm
          }
      today = yyyy+'-'+mm+'-'+dd;
      document.getElementById("currencyValueOn").value = today;
      document.getElementById("currencyValueOn").setAttribute('max', today);
    }
// })();

  function httpGet(theUrl)
{
  console.log(document.getElementById('currencyValueOn'));
  console.log("in function");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    console.log(xmlHttp.responseText);
}


function decider(){
  var val = document.querySelector('input[name = "searchType"]:checked').value;
  // console.log(val);
  if(val=='Single'){
    httpGetAsync();
  }
  if(val=='Range'){
    console.log('range selected');
    rangeValue();
    console.log('in decider');
    showGraph();
  }
}

// ***************************************************

var dates = [];
var values =[];
var yScale = [];
var arr1=[];
var CompleteData = [];
function rangeValue(){

  var dFrom = document.getElementById('currencyValueFrom').value;
  var dTo = document.getElementById('currencyValueTo').value;
  console.log("dd : "+dFrom);

  var e = document.getElementById("convertFrom");
  var convertFrom = e.options[e.selectedIndex].value;

  var e1 = document.getElementById("convertTo");
    var convertTo = e1.options[e1.selectedIndex].value;
    var convertedValue = document.getElementById('convertedValue');

    var date=dFrom.split('-');
    var fromDay=date[2];
    var fromMonth=date[1];
    var fromYear=date[0];

    var date=dTo.split('-');
    var toDay=date[2];
    var toMonth=date[1];
    var toYear=date[0];

console.log('rangeValue()');
    var line;
  var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              var allData = xmlHttp.responseText;
              if(allData){
                var arr = allData.split('\n');
                for(var i =0; i<arr.length; i++)
                {
                    //  console.log(arr[i]);
                    line = arr[i].split(' ');
                    var temp = line[0].replace('-',',');


                    if(temp){
                        yScale.push(parseFloat(line[1]));
                        CompleteData.push({
                          x: new Date(temp.replace('-',',')),
                          y: parseFloat(line[1])
                      });
                    }
              }

            console.log('here');
      }
    }
      //  yyyy-mm-dd

      xmlHttp.open("GET", 'http://currencies.apps.grandtrunk.net/getrange/'+fromYear+'-'+fromMonth+'-'+fromDay+'/'+toYear+'-'+toMonth+'-'+toDay+'/'+convertFrom+'/'+convertTo,false); // true for asynchronous
      // xmlHttp.open("GET", 'http://currencies.apps.grandtrunk.net/getrate/'+year+'-'+month+'-'+day+'/'+convertFrom+'/'+convertTo, true); // true for asynchronous

      // xmlHttp.setRequestHeader("Access-Control-Allow-Origin","*");
      xmlHttp.setRequestHeader("Access-Control-Allow-Origin","*");
   xmlHttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
   xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "GET");
   xmlHttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");


      // xmlHttp.send(null);
      console.log('end');
    }

      function splitText(allData){
          console.log('in splitText()');
          console.log(allData);
      }



function showGraph(){

    //  console.log("*****************"+values[0]);
      var chart = new CanvasJS.Chart("chartContainer",
      {
        title:{
          text: "Currency Chart"
      },
      axisX:{
          title: "Date",
          gridThickness: 2
      },
      axisY: {
          title: "Value",
          minimum : (Math.min.apply(null, yScale)),
          maximum : (Math.max.apply(null, yScale))
      },
      data: [
      {
          type: "area",
          dataPoints: CompleteData
       }
      ]
   });

      chart.render();
}




// ************************************************************

function httpGetAsync()//theUrl, callback)
{
  var currencyCount = document.getElementById('currencyCount').value;
  if (isNaN(currencyCount))
  {
    alert("Must input numbers");
    document.getElementById('currencyCount').value=""
    return false;
  }


  console.log('currencyCount : '+currencyCount);
  var dd = document.getElementById('currencyValueOn').value;
  console.log("dd : "+dd);
  var e = document.getElementById("convertFrom");
  var convertFrom = e.options[e.selectedIndex].value;

  var e1 = document.getElementById("convertTo");
    var convertTo = e1.options[e1.selectedIndex].value;
    var convertedValue = document.getElementById('convertedValue');

      console.log('in else');
        var date=dd.split('-');
        var day=date[2];
        var month=date[1];
        var year=date[0];
        console.log("D : "+day +" M : "+month+" Y : "+year);


        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                console.log((xmlHttp.responseText)*currencyCount);
                  convertedValue.innerHTML = "<b> " +currencyCount+"  " + convertFrom +" = "+(xmlHttp.responseText)*currencyCount+ "  " +convertTo +"</b>";
        }
        xmlHttp.open("GET", 'http://currencies.apps.grandtrunk.net/getrate/'+year+'-'+month+'-'+day+'/'+convertFrom+'/'+convertTo, false); // true for asynchronous
        xmlHttp.send(null);
  // }
  console.log(dd);


}
  // </script>
function setDate(){
  console.log('setDate()');
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
   if(dd<10){
          dd='0'+dd
      }
      if(mm<10){
          mm='0'+mm
      }
  today = yyyy+'-'+mm+'-'+dd;
  document.getElementById("currencyValueFrom").value = today;
  document.getElementById("currencyValueTo").value = today;
  document.getElementById("currencyValueFrom").setAttribute('max', today);
  document.getElementById("currencyValueTo").setAttribute('max', today);
}

jQuery(document).ready(function(){

$('input:radio[name="searchType"]').change(function(){
  if($(this).val() == 'Range'){

      $("#single").hide();
      $("#double").show();
         //alert("test");
  }
  if($(this).val() == 'Single'){
    $("#single").show();
    $("#double").hide();
    }
  });
});
$(document).ready(function(){
    $("#double").hide();
});
