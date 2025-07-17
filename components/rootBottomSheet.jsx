import { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Dimensions, View } from "react-native";
import { theme } from "../theme";

const { height, width } = Dimensions.get("window");

const RootBottomSheet = ({
  children,
  snapHeight = "88%",
  isBottomSheetOpen,
  setIsBottomSheetOpen,
  enablePanDownToClose,
  ifHandleComponent = false,
}) => {
  const bottomPageRef = useRef(null);
  const snapPoints = useMemo(() => [snapHeight], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6}
        pressBehavior="close"
        enableTouchThrough={false}
      />
    ),
    []
  );

  useEffect(() => {
    if (isBottomSheetOpen) bottomPageRef.current.expand();
    else bottomPageRef.current.close();
  }, [isBottomSheetOpen]);

  return (
    <BottomSheet
      index={-1}
      ref={bottomPageRef}
      snapPoints={snapPoints}
      backgroundStyle={[
        {
          backgroundColor: theme.main_background,
        },
      ]}
      handleComponent={ifHandleComponent ? () => null : undefined}
      handleIndicatorStyle={{ backgroundColor: !ifHandleComponent && "white" }}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={enablePanDownToClose}
      enableContentPanningGesture={enablePanDownToClose}
      enableHandlePanningGesture={enablePanDownToClose}
      enableDynamicSizing={false}
      onClose={() => setIsBottomSheetOpen(false)}
    >
      <BottomSheetView
        style={{ flex: 1, marginTop: ifHandleComponent && -10, paddingTop: 0 }}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default RootBottomSheet;
