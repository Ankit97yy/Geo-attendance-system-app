import { DateTime } from "luxon";

export const initialState = {
  currentLocation: {
    coords: {
      latitude: 26.193592,
      longitude: 90.7647763,
    },
  },
  showMarker: false,
  render: false,
  visible: false,
  punchIn: false,
  punchOut: false,
  onLeave: false,
  donePunchedIn: false,
  donePunchedOut: false,
  inTime: false,
  canMarkAttendance() {
    console.log("inside can mark attendace")
    return this.showMarker && !this.onLeave && this.inTime && (!this.donePunchedIn || !this.donePunchedOut);
  }
};

export function locationReducer(state, action) {
  switch (action.type) {
    case "location":
      console.log("location dispatched");
      return {
        ...state,
        currentLocation: action.payload,
        showMarker: true,
      };
    case "render":
      return {
        ...state,
        render: !state.render,
      };
    case "hideModal":
      return {
        ...state,
        visible: false,
      };
    case "enablePunchIn":
      return {
        ...state,
        punchIn: action.payload,
      };
    case "enablePunchOut":
      return {
        ...state,
        punchOut: action.payload,
      };
    case "handlePunchIn":
      return {
        ...state,
        punchIn: false,
        visible: true,
        donePunchedIn: true,
      };
    case "handlePunchOut":
      return {
        ...state,
        punchIn: false,
        punchOut: false,
        visible: true,
        donePunchedOut: true,
      };
    case "onLeave":
      return {
        ...state,
        // punchIn:!action.payload,
        onLeave: action.payload,
      };
    case "donePunchedIn":
      return {
        ...state,
        donePunchedIn: action.payload,
      };
    case "donePunchedOut":
      return {
        ...state,
        donePunchedOut: action.payload,
      };
    case "checkTime":
      if (
        DateTime.now() >= DateTime.fromFormat(action.payload.startTime,"HH:mm:ss") &&
        DateTime.now() <= DateTime.fromFormat(action.payload.endTime,"HH:mm:ss")
      ) {
        console.log("welcome");
        return {
          ...state,
          inTime: true,
        };
      } else
        return {
          ...state,
          inTime: false,
        };
    default:
      console.log("#####################################", action.type);
      break;
  }
}
