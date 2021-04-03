var fundName =[];
var i;


 $.get('Assets/FundTextFiles/fundnames.txt', function(data) {
        //var fileDom = $(data);

        var lines = data.split("\n");
        $.each(lines, function(n, elem) {
            fundName.push(elem);
        });
    });



setTimeout(() => {  console.log(fundName[3]); }, 2000);