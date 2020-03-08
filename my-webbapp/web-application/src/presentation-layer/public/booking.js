

document.addEventListener("DOMContentLoaded", function(){

    // Definitions
    const TIMESLOTS = [16, 17, 18, 19]

    // Elements
    let bookingForm = document.getElementById("bookingForm")
    let loginView = document.getElementById("loginView")
    let bookedDate = document.getElementById("bookedDate")
    let inputDate = document.getElementById("inputDate")
    changeView()
    let calendarView = document.getElementById("calendarView")
    let calendarHeader = document.getElementById("calendarHeader")
    const cells = []
    let head1 = document.getElementById("head1")
    let head2 = document.getElementById("head2")
    let head3 = document.getElementById("head3")
    let cell00 = document.getElementById("00")
    cells.push(cell00)
    let cell01 = document.getElementById("01")
    cells.push(cell01)
    let cell02 = document.getElementById("02")
    cells.push(cell02)
    let cell10 = document.getElementById("10")
    cells.push(cell10)
    let cell11 = document.getElementById("11")
    cells.push(cell11)
    let cell12 = document.getElementById("12")
    cells.push(cell12)
    let cell20 = document.getElementById("20")
    cells.push(cell20)
    let cell21 = document.getElementById("21")
    cells.push(cell21)
    let cell22 = document.getElementById("22")
    cells.push(cell22)
    let cell30 = document.getElementById("30")
    cells.push(cell30)
    let cell31 = document.getElementById("31")
    cells.push(cell31)
    let cell32 = document.getElementById("32")
    cells.push(cell32)
    
    // Style clickable cells. 
    for(let i = 0; i < cells.length; i++){
        cells[i].style.cursor = "pointer"
        cells[i].style.color = "blue"
        cells[i].addEventListener("click", function(event){
            cellClicked(cells[i].id)
            changeView()
        })
        cells[i].addEventListener("mouseover", function(event){
            cells[i].style.textDecoration = "underline"
        })
        cells[i].addEventListener("mouseout", function(event){
            cells[i].style.textDecoration = "none"
        })
        
    }

    // Bottom buttons
    const nextBtn = document.getElementById("nextBtn")
    const prevBtn = document.getElementById("prevBtn")

    // Calendar objects
    let today = new Date()
    let currentMonth = today.getMonth()
    let currentYear = today.getFullYear()
    let currentDate = today.getDate()
    let currentDay = today.getDay()

    // Calculation vars
    let weekIndex = 0  // + - for clicks on next / previous
    let showingDates = [] // When running setDatesToShow, we set this variable to whatever the function returns to keep track

    // Visual pre-setups
    calendarHeader.innerText = today.toDateString() // Showing todays date
    setRow0(today)
    setPrevBtn()

    // Recieves a date object and returns a date object "daysToJump" number of days days from date. 
    function getNextDate(date, daysToJump = 1){
        let nextDate = date.getDate()+daysToJump
        let monthDays = getMonthDays(date.getMonth())
        let month = date.getMonth()
        let year = date.getFullYear()
        if(nextDate > monthDays){
            nextDate = nextDate - monthDays
            month = month+1
            if(month == 0){
                year = year+1
            }
        }
        let dateToReturn = new Date(year, month, nextDate)
        return dateToReturn
    }
    
    // Set up header row with month and date. 
    function setRow0(date){ // !! change month to showing month and keep track of that. 
        const datesToShow = getDatesToShow(date)
        head1.innerText = datesToShow[0].toDateString()
        head2.innerText = datesToShow[1].toDateString()
        head3.innerText = datesToShow[2].toDateString()
    }

    // Returns number of days from todays date until thuesday, starting from Friday
    function daysUntilTuesday(weekDay){
        switch (weekDay){
            case 0: return 2; break;
            case 1: return 1; break;
            case 2: return 0; break;
            case 3: return -1; break;
            case 4: return -2; break;
            case 5: return 4; break;
            case 6: return 3; break;
        }
    }
    // Check if the year is a leap year
    function isLeapYear(year){
        if(year%4 == 0){
            return true;
        }
        return false;
    }

    // Returns number of days in the month. 
    function getMonthDays(month){
        if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
            return 31;
        }
        else if (month == 1 && !isLeapYear(currentYear)){
            return 28
        }
        else if (month == 1){
            return 29
        }
        return 30
    }
    // Calculate which dates to show
    function getDatesToShow(date){
        let dayOfMonth = date.getDate()
        let year = date.getFullYear()
        let month = date.getMonth()
        let firstDate = new Date(year, month , dayOfMonth + daysUntilTuesday(date.getDay()))
        let secondDate = getNextDate(firstDate)
        let thirdDate = getNextDate(secondDate)
        let datesToShow = [firstDate, secondDate, thirdDate]
        showingDates = datesToShow
        return datesToShow
    }
    function cellClicked(cellId){
        let dateTimeClicked = getDateTimeClicked(cellId)
            console.log(dateTimeClicked)
            if(bookingForm){
                bookedDate.innerText = dateTimeClicked.toString().slice(0, 21)
                inputDate.setAttribute("value", dateTimeClicked)
            }
    }

    // Return date and time for clicked cell
    function getDateTimeClicked(cellID){
        let timeClicked = TIMESLOTS[parseInt(cellID.charAt(0))]
        let dateClicked = showingDates[parseInt(cellID.charAt(1))]
        let date = new Date()
        date = dateClicked
        date.setHours(timeClicked)
        return date
    }
    function changeView(){
        if(bookingForm){
            if(bookingForm.style.display == "none"){
                calendarView.style.display = "none"
                bookingForm.style.display = "block"
            }
            else{
                bookingForm.style.display = "none"
            }
        }
        else if(loginView){
            if(loginView.style.display == "none"){
                calendarView.style.display = "none"
                loginView.style.display = "block"
            }
            else{
                loginView.style.display = "none"
            }
        }
        
    }

    // Disable prev btn looking at the current date
    function setPrevBtn(){
        if(weekIndex > 0){ prevBtn.disabled = false }
        else{ prevBtn.disabled = true }
    }
    function setNextBtn(){
        if(weekIndex < 4){nextBtn.disabled = false}
        else{ nextBtn.disabled = true }
    }
    // Next button clicked
    nextBtn.addEventListener("click", function(event){
        event.preventDefault()
        weekIndex++
        setPrevBtn()
        setNextBtn()
        console.log(weekIndex)
        let nextTuesday = getNextDate(showingDates[0], 7)
        setRow0(nextTuesday)
    })
    // Previous button clicked
    prevBtn.addEventListener("click", function(event){
        event.preventDefault()
        weekIndex--
        setPrevBtn()
        setNextBtn()
        let prevTuesday = getNextDate(today, 7*weekIndex) // Accually counts weeks from todays date, not from what is showing
        setRow0(prevTuesday)
    })
})
