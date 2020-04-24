document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    let width = 15
    let currentShooterIndex = 145
    let currentInvaderIndex = 0
    let alienInvadersTakeDown = []
    let result = 0
    let direction = 1
    let invaderId

    //Alien Invaders
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    //draw Alien Invaders
    alienInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'))

    //draw shooter
    squares[currentShooterIndex].classList.add('shooter')

    //move the shooter along the line
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        switch(e.keyCode) {
            case 37:
                if(currentShooterIndex % width !==0) currentShooterIndex -= 1
                break
            case 39:
                if(currentShooterIndex % width < width -1) currentShooterIndex += 1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown', moveShooter)


    //moving Alien Invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width
        } else if (direction === width) {
            if(leftEdge) direction = 1
            else direction = -1
        }

        for( let i = 0; i <= alienInvaders.length -1; i++) {
            squares[alienInvaders[i]].classList.remove('invader')
        }

        for (let i = 0; i <= alienInvaders.length -1; i++) {
            alienInvaders[i] += direction
        }

        for (let i = 0; i <= alienInvaders.length -1; i++) {
            if(!alienInvadersTakeDown.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }
    } 

        //decide if Game Over
        if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            resultDisplay.textContent = 'Game Over'
            squares[currentShooterIndex].classList.add('boom')
            clearInterval(invaderId)
        }

        for(let i =0; i <= alienInvaders.length -1; i++) {
            if(alienInvaders[i] > (squares.length - (width -1))) {
                resultDisplay.textContent = 'Game Over'
                clearInterval(invaderId)
            }
        }

        if(alienInvadersTakeDown.length === alienInvaders.length) {
            console.log(alienInvadersTakeDown.length)
            console.log(alienInvaders.length)
            resultDisplay.textContent = 'You Win!'
            clearInterval(invaderId)
        }
    }
    invaderId = setInterval(moveInvaders, 500)

    //shooting function
    function shoot(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex
        //move the laser from the shooter to the aliens
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex -= width
            squares[currentLaserIndex].classList.add('laser')
            if(squares[currentLaserIndex].classList.contains('invader')) {
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
                clearInterval(laserId)

            const alienTakeDown = alienInvaders.indexOf(currentLaserIndex)
            alienInvadersTakeDown.push(alienTakeDown)
            result++
            resultDisplay.textContent = result
            }

            if(currentLaserIndex < width ) {
                clearInterval(laserId)
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
            }
        }

      switch(e.keyCode) {
          case 32:
              laserId = setInterval(moveLaser, 100)
              break
      }
    }

        document.addEventListener('keyup', shoot)
})