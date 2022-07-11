let currentOpenTab = 'general-tab'
let scaledDown = false
let readyForExpanding = false

const sidebar = document.querySelector('.sidebar')
const tabButtons = document.querySelectorAll('.tab-button')
const menuItems = document.querySelectorAll('.dropdown-button .menu-item.dropdown-header, .menu-item:not(.dropdown-item)')
const subMenuItems = document.querySelectorAll('.dropdown-item-wrapper .menu-item')


function onSidebarHover() {
    if (window.innerWidth > 576 && readyForExpanding) {
        sidebar.classList.remove('mobile-view')
        sidebar.classList.add('expanded')
        scaledDown = false
    }
}

function onSidebarMouseLeave() {
    if (readyForExpanding) {
        sidebar.classList.add('mobile-view')
        sidebar.classList.remove('expanded')
        scaledDown = true
    } else if (scaledDown) {
        readyForExpanding = true
    }
}

function expandSidebar () {
    sidebar.classList.remove('expanded')
    scaledDown = false
    readyForExpanding = false
}

function makeMobileView() {
    sidebar.classList.add('mobile-view')
    scaledDown = true
}

function openTab(tabId) {
    if (currentOpenTab === tabId) {
        return
    }

    const prevOpenTab = document.getElementById(currentOpenTab)
    const newOpenTab = document.getElementById(tabId)

    prevOpenTab.classList.remove('open')
    newOpenTab.classList.add('open')
    currentOpenTab = tabId
}

function onTabButtonClicked(event) {
    const isAlreadyClicked = event.currentTarget.classList.contains('selected')
    if (isAlreadyClicked) {
        return
    }

    const prevSelectedItem = document.querySelector('.tab-button.selected')

    prevSelectedItem.classList.remove('selected')
    event.currentTarget.classList.add('selected')
}

function onMenuItemClicked(event) {
    const isDropdownHeader = event.currentTarget.classList.contains('dropdown-header')
    let isAlreadyClicked

    if (isDropdownHeader) {
        isAlreadyClicked = event.currentTarget.parentElement.classList.contains('selected')
    } else {
        isAlreadyClicked = event.currentTarget.classList.contains('selected')
    }

    if (isAlreadyClicked) {
        return
    }

    const prevSelectedItem = document.querySelector('.dropdown-button.selected, .menu-item:not(.dropdown-item).selected')
    const prevSelectedSubItem = document.querySelector('.menu-item.dropdown-item.selected')

    if (prevSelectedItem) {
        prevSelectedItem.classList.remove('selected')
    }

    if (prevSelectedSubItem) {
        prevSelectedSubItem.classList.remove('selected')
    }

    if (isDropdownHeader) {
        event.currentTarget.parentElement.classList.add('selected')
    } else {
        event.currentTarget.classList.add('selected')
    }
}

function onSubMenuItemClicked(event) {
    const isAlreadyClicked = event.currentTarget.classList.contains('selected')
    if (isAlreadyClicked) {
        return
    }

    const prevSelectedItem = document.querySelector('.menu-item.dropdown-item.selected')
    if (prevSelectedItem) {
        prevSelectedItem.classList.remove('selected')
    }

    event.currentTarget.classList.add('selected')
}

window.addEventListener("resize", function() {
    if (window.innerWidth < 576 && !sidebar.classList.contains('mobile-view')) {
        sidebar.classList.add('mobile-view')
    } else if (window.innerWidth >= 576 && sidebar.classList.contains('mobile-view') && !scaledDown) {
        sidebar.classList.remove('mobile-view')
    }
})

tabButtons.forEach(item => {
    item.addEventListener('click', event => onTabButtonClicked(event))
})

menuItems.forEach(item => {
    item.addEventListener('click', event => onMenuItemClicked(event))
})

subMenuItems.forEach(item => {
    item.addEventListener('click', event => onSubMenuItemClicked(event))
})

if (window.innerWidth < 576) {
    sidebar.classList.add('mobile-view')
}
