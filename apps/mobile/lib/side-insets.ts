import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSplitView } from "./split-view";

/**
 * Scroll view padding that keeps content clear of side bars, cutouts and the iPhone Duo outer
 * display's status bar while the background still runs edge to edge. Beside the chat list the
 * left edge is already clear.
 */
export function useSideInsets() {
  const insets = useSafeAreaInsets();
  const { inboxShown } = useSplitView();
  return { paddingLeft: inboxShown ? 0 : insets.left, paddingRight: insets.right };
}
