import { Dimensions, StyleSheet } from 'react-native'
import { alignment } from '../../utilities/alignment'
import colors from '../../utilities/colors'
import { scale, verticalScale } from '../../utilities/scaling'
const { height } = Dimensions.get('window')

export default {
  flex: {
    flex: 1,
    backgroundColor: colors.themeBackground
  },
  line: {
    width: '80%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.horizontalLine,
    alignSelf: 'center',
    ...alignment.MTmedium,
    ...alignment.MBmedium
  },
  customerCard: {
    width: '100%',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  customerSubCard: {
    width: '85%',
    height: '90%',
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: '#F3FAFE',
    borderRadius: scale(10),
    borderColor: colors.horizontalLine
  },
  customerHeader: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customerContent: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  customerSubContent: {
    width: '80%',
    height: '95%',
    justifyContent: 'space-around'
  },
  customerContentRow: {
    width: '100%',
    height: '50%',
    flexDirection: 'row',
    paddingLeft: '8%'
  },
  customerImgContainer: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  customerTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  customerAddContainer: {
    justifyContent: 'center',
    width: '90%'
  },
  orderContainer: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.PTxSmall,
    ...alignment.PBxSmall
  },
  orderSubContainer: {
    width: '85%',
    minHeight: height * 0.3,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: scale(20),
    backgroundColor: '#F3FAFE',
    borderColor: colors.horizontalLine
  },
  orderHeader: {
    width: '100%',
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderContent: {
    width: '100%',
    alignItems: 'center'
  },
  orderSubContent: {
    width: '90%',
    flexDirection: 'row'
  },
  orderTextLeftContainer: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderTextCenterContainer: {
    width: '65%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  orderTextRightContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  orderSpacer: {
    width: '100%',
    height: height * 0.02
  },
  orderRow: {
    width: '100%',
    height: height * 0.05,
    alignItems: 'center'
  },
  orderRow2: {
    width: '100%',
    height: height * 0.07,
    alignItems: 'center',
    ...alignment.PBlarge
  },
  orderSubRow: {
    width: '90%',
    height: '100%',
    flexDirection: 'row'
  },
  orderTextLeft: {
    width: '50%',
    height: '100%',
    paddingLeft: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  orderTextRight: {
    width: '50%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  actionContainer: {
    width: '100%',
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    ...alignment.MTmedium,
    ...alignment.MBlarge
  },
  actionSubContainer: {
    width: '90%',
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: scale(10),
    ...alignment.MBlarge
  },
  cancelBtnStyle: {
    width: '80%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10)
  },
  acceptBtnStyle: {
    backgroundColor: colors.tagColor,
    width: '80%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(10)
  },
  removeBtnStyle: {
    backgroundColor: colors.tagColor,
    width: '45%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  baseSpacer: {
    marginTop: verticalScale(15)
  },
  mapContainer: {
    width: '85%',
    alignSelf: 'center',
    height: verticalScale(200)
  }
}
