import { scale, verticalScale } from '../../utilities/scaling'

const Styles = {
  card_container: {
    elevation: 10,
    width: '90%',
    padding: 20,
    justifyContent: 'center',
    height: verticalScale(170),
    alignSelf: 'center',
    borderRadius: scale(20),
    backgroundColor: '#fff',
    marginBottom: scale(20),
    shadowOffset: { width: 0, height: scale(2) },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: scale(2),
    borderWidth: 0.4,
    borderColor: '#e1e1e1'
  },
  card_container__left: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '70%',
    width: '58%',
    paddingLeft: '5%'
  },
  card_container__right: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '80%',
    width: '35%'
  },
  left_toptextLine: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between'
  },
  cardSubContainerRight: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  cardStatusContainer: {
    padding: scale(8),
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(5)
  },
  cardRightArrow: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Styles
