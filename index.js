    document.addEventListener('keydown',function(e){
     console.log("A word is here");
        
    })

    const words = document.querySelector('.wordsPerMinute');
    const accuracy = document.querySelector('.accuracy');
    const errors = document.querySelector('.errors');

    const time = document.querySelector('.time');
    const modal = document.querySelector('.modal');
   
    document.querySelector('.reset').addEventListener('click',function(){
        words = 0 ;
        accuracy = 0;
        errors = 0;
        restClosed(); 
    });


    document.querySelector('.scoreCheck').addEventListener('click',function(){
        openModal();
    });

    const openModal = function(){
        modal.classList.remove('hidden');
    }

    const closeModal = function(){
        modal.classList.add('hidden');
    }
    
    document.addEventListener('keydown',function (e){

        if(e.key === 'Escape' && !modal.classList.contains('hidden')){
            closeModal();
        }
    });

    let restClosed = function(){
          document.addEventListener('keydown',function (e){

        if(e.key === 'Escape' && !modal.classList.contains('hidden')){
            closeModal();
        }
    });
    }