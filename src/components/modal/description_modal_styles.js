export const descriptionModalStyles = {
  overlay: {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.54)',
    transition        : 'all 0.3s ease-in-out'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#fafafa',
    width                 : '384px',
    height                : '150px',
    borderRadius          : '2px',
    transition            : 'all 0.3s ease-in-out',
    boxShadow             : '0 16px 16px 0 rgba(0, 0, 0, 0.24), 0 0 16px 0 rgba(0, 0, 0, 0.12)'
  }
};
