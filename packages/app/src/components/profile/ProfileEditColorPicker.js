import React from 'react'
import PropTypes from 'prop-types'
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color'

function ProfileEditColorPicker({
  handleColorPickerChange,
  handleColorPickerClick,
  handleColorPickerClose,
  displayColorPicker,
  rgbaColor
}) {
  const styles = reactCSS({
    default: {
      color: {
        width: '100%',
        height: '20px',
        borderRadius: '2px',
        background: rgbaColor
      },
      swatch: {
        width: '100%',
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
  })

  return (
    <div>
      <div>
        <div style={styles.swatch} onClick={handleColorPickerClick} className="cp-width">
          <div style={styles.color} />
        </div>
        {displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={handleColorPickerClose} />
            <ChromePicker color={rgbaColor} onChange={handleColorPickerChange} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

ProfileEditColorPicker.propTypes = {
  handleColorPickerChange: PropTypes.func,
  handleColorPickerClick: PropTypes.func,
  handleColorPickerClose: PropTypes.func,
  displayColorPicker: PropTypes.func,
  rgbaColor: PropTypes.string
}

export default ProfileEditColorPicker