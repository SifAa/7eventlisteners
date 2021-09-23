    // DOM elements
    let body = document.querySelector("body");
    let btnWho = document.querySelector("#btn-who");
    let imgWho = document.querySelector("#img-hid");
    let btndbl = document.querySelector("#btn-dbl");
    let surprise = document.querySelector("#surprise");
    let elementInput = document.querySelector("#input-event");

    // little quiz
    let question =
    {
        title: "Which is not a firetype pokemon?",
        answers: [
            'Gyarados',
            'Arcanine',
            'Ninetales'
        ],
        correctAnswer: '0'
    };

    function showQuestion(q) {
        
        let title = document.querySelector("#title")
        title.textContent = q.title;

        let result = document.querySelector("#result")

        let answer = document.querySelectorAll(".answers");
        answer.forEach(function(element, index){
          element.textContent = q.answers[index];


          // EventListener 1
          element.addEventListener("click", function(){
              if(q.correctAnswer == index) {
                  result.innerHTML = "WHO IS THAT POKEMON? IIIIITS GYARADOS!!!!";
                  element.classList.add("bg-green");
              } else {
                  result.innerHTML = "Really! You can do better than that.";
                  element.classList.add("bg-red");
              }
          })
          
          // EventListener 2
          element.addEventListener("mouseover", function(){
              element.classList.add("bg-plum");
              element.classList.remove("bg-green")
              element.classList.remove("bg-red")
            })

          // EventListener 3
          element.addEventListener("mouseout", function(){
                element.classList.remove("bg-plum");
            })
        });
    }
    showQuestion(question);

    // Eventlistener 4
    btnWho.addEventListener("dblclick", function(){
        if(imgWho.classList.contains("invisible")){
            imgWho.classList.remove("invisible");
        }else{
            imgWho.classList.add("invisible");
        }
    });

    // Eventlistener 5
    btndbl.addEventListener("mouseover", function(){
        let newimg = document.createElement("img");
        let imgarray = [
            "img/arcanine.png", 
            "img/ninetales.png", 
            "img/pikachu.png"
        ]
        newimg.setAttribute("src", imgarray[Math.floor(Math.random() * imgarray.length)]);
        if (surprise.hasChildNodes()){
            surprise.removeChild(surprise.firstChild)
        }
            surprise.appendChild(newimg);
    })

    // Eventlistener 6
    elementInput.addEventListener("paste", function(){
        if(elementInput.value.length > 5){
            pastefunction();
        } else {
            elementInput.classList.add("bg-plum");
            elementInput.classList.remove("large");
        }
    })

    function pastefunction(){
        elementInput.classList.add("large");
        elementInput.classList.remove("bg-plum")
    }


    // Event listener 7 Labyrinth game (cause I needed a refresher on this)
    let blockSize = 50
    let y = 0
    let x = 0
    let player = {y, x};
    let canvas = document.querySelector('#cnv');
    let ctx = canvas.getContext('2d');

    count = 0;

    let level = 0;

    let maze = [
        [
            [1, 2, 1, 1, 1, 1],
            [1, 0, 0, 1, 0, 1],
            [1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 1, 1, 1, 3, 1]
        ]
    ];

    function grid() {

        for (y = 0; y < maze[level].length; y++) {
            createMaze(y);
        }
    
        function createMaze(y) {
            for (x = 0; x < maze[level][y].length; x++) {
                createMaze1(y, x);
            }
        }
        function createMaze1(y, x) {
            if (maze[level][y][x] === 1) {
                ctx.fillStyle = "green";
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            } else if (maze[level][y][x] === 3) {
                player = { y, x };
                ctx.fillStyle = "purple";
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            } else if (maze[level][y][x] === 2) {
                ctx.fillStyle = "lightblue";
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            } else if (maze[level][y][x] === 0) {
                ctx.fillStyle = "white";
                ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
            }
        }
    };

    window.addEventListener('keydown', function (event) {
        console.log(event.keyCode);
        switch (event.keyCode) {
            case 38: // Up
                console.log(level);
                moveUp();
                break;
    
            case 37: // Left
                console.log(level);
                moveLeft();
                break;
    
            case 39: // Right
                console.log(level);
                moveRight();
                break;
    
            case 40: // Down
                console.log(level);
                moveDown();
                break;
    
        }
    }, false);
    
    function moveUp() {
    
        maze[level][player.y][player.x] = 0;
        if (maze[level][player.y - 1][player.x] == 0)
        {
            maze[level][player.y - 1][player.x] = 3;
            maze[level][player.y][player.x] = 0;
    
        } 
        else if (maze[level][player.y - 1][player.x] == 2) 
        {
            clapCrowd()
        } 
        else 
        {
            hitWall()
        }
        grid();
    }
    
    function moveDown() {
    
        if (maze[level][player.y + 1][player.x] == 0) 
        {
            maze[level][player.y + 1][player.x] = 3; 
            maze[level][player.y][player.x] = 0;
            walkSound();
        } 
        else if (maze[level][player.y + 1][player.x] == 2) 
        {
            clapCrowd()
    
        } 
        else 
        {
            hitWall()
        }
        grid();
    }
    
    
    function moveRight() {
    
        if (maze[level][player.y][player.x + 1] == 0)
        {
            maze[level][player.y][player.x + 1] = 3; 
            maze[level][player.y][player.x] = 0;
            walkSound();
        } 
        else if (maze[level][player.y][player.x + 1] == 2) 
        {
            clapCrowd()    
        } 
        else 
        {
            hitWall()
        }
        grid();
    }
    
    function moveLeft() {
    
        if (maze[level][player.y][player.x - 1] == 0)
        {
            maze[level][player.y][player.x - 1] = 3; 
            maze[level][player.y][player.x] = 0;
            walkSound();
        } 
        else if (maze[level][player.y][player.x - 1] == 2) 
        {
            clapCrowd()
        } 
        else 
        {
            hitWall()
        }
        grid();
    }
    
    function walkSound() {
        let audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-35448/zapsplat_multimedia_game_sound_jump_retro_006_38991.mp3');
        audio.play();
    }
    
    function hitWall() {
        let audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-35448/zapsplat_multimedia_game_sound_error_tone_38985.mp3');
        audio.play();
    }
    
    function clapCrowd() {
    
        let audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/cc0/human_audience_cheer_and_clap.mp3');
        audio.play();
    
    };


    let level1 = document.querySelector("#level1");
    level1.addEventListener("click", function () {
        chooseLevel(0);
    })
    
    function chooseLevel(bane) {
    
        if (bane == 0) {
            level = 0;
            grid();
        } else if (bane == 1) {
            level = 1;
            grid();
            console.log("hej");
        }
    
    }
    
    if (level == undefined) {
        level = 0;
        grid();
    }
    
    
    bool = true;