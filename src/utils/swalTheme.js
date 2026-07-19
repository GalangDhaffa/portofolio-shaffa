import Swal from 'sweetalert2'

/**
 * Themed SweetAlert2 instance that auto-detects dark mode
 * and applies matching styles from the website's design system.
 */
const isDark = () => document.documentElement.classList.contains('dark')

const themedSwal = Swal.mixin({
  customClass: {
    popup: 'swal-themed-popup',
    title: 'swal-themed-title',
    htmlContainer: 'swal-themed-text',
    confirmButton: 'swal-themed-confirm',
    cancelButton: 'swal-themed-cancel',
  },
  buttonsStyling: false,
  didOpen: () => {
    // Dynamically set dark/light class on the popup
    const popup = Swal.getPopup()
    if (isDark()) {
      popup.classList.add('swal-dark')
    } else {
      popup.classList.remove('swal-dark')
    }
  }
})

export default themedSwal
