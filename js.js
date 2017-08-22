var allEvents = [];
        var todaysEvents = [];
        var current;

        var update = () => {
            $('.cardList').children().empty();
            todaysEvents = [];
            $('#date').text(current);
            for (i in allEvents) {
                if (allEvents[i].date === current) {
                    console.log(allEvents[i]);
                    todaysEvents.push(allEvents[i])
                    addCard(allEvents[i]);
                }
            }
        }

        var nextDate = () => {
            current = moment(current).add(1,'days').format('MM DD YY');
            update();   
        }

        var prevDate = () => {
            current = moment(current).subtract(1,'days').format('MM DD YY');
            update();   
        }


            
        

        var fillit = (obj, template, divtofill) => {
                var source   = $(template).html();
                var template = Handlebars.compile(source);
                var html = template(obj);
                $(divtofill).html(html);
        }

        var addCard = (obj) => {
            var venue;
            switch(obj.venue) {
                case 'Snug Harbor':
                    venue = 'snug';
                    break;
                case 'The Tin Roof':
                    venue = 'tinroof';
                    break;
                case 'Evening Muse':
                    venue = 'muse';
                    break;
                case 'The Milestone Club':
                    venue = 'milestone';
                    break;
            }

            // fillit(obj, eventTemplate,'#' + venue);


            //add handlebars where id = venue
            // var source = $('#eventTemplate').html();
            // var template = Handlebars.compile(source);
            // var html = template(obj);
            
            // $('.slider').html(html);

            var html = '<li><img src="https://lorempixel.com/580/250/nature/1"><div class="caption center-align"><h3>' + obj.event  + '</h3><h4>' + obj.desc  + '</h4> <h5 class="light grey-text text-lighten-3">' + obj.href  + '</h5></div></li>';
            console.log(html);
            console.log(typeof html);

            $('.slides').append(html);



        }       
    
        $(document).ready(function(){


            

            //next date button
            $('#next').click(()=>{
                nextDate();
            });

            $('#prev').click(()=>{
                prevDate();
            });


            

            //concat all data arrays

            
            allEvents = allEvents.concat(muse);
            allEvents = allEvents.concat(snug);
            allEvents = allEvents.concat(tinroof);
            allEvents = allEvents.concat(milestone);
           

            //console.log(allEvents);

            //set current date
            current = moment().format('MM DD YY');
            current = '08 25 17'; //testing date, friday
            todaysEvents = [];

            // adds cards 
            update();
            $('.slider').slider();

            

           
        });

        

        
    