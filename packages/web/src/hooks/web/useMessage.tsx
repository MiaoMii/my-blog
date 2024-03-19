// @ts-ignore
import ElMessage from "element-plus/lib/components/message";

import { h } from "vue";

const createMessage = () => {
	ElMessage({
		message: h("p", null, [h("span", null, "Message can be "), h("i", { style: "color: teal" }, "VNode")]),
	});
};
const createErrorModal = () => {};

export function _message() {
	return {
		createMessage,
		createErrorModal,
	};
}
