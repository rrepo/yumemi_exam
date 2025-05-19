import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PrefectureSelector from "@/components/SelectMap.vue";

describe("PrefectureSelector", () => {
  it("チェックボックスをクリックすると update:modelValue イベントが emit される", async () => {
    const wrapper = mount(PrefectureSelector, { props: { modelValue: [] } });

    const checkbox = wrapper.find('input#pref1');
    await checkbox.setChecked(true);

    expect(wrapper.emitted("update:modelValue")).toBeTruthy();
    const emittedPayload = wrapper.emitted("update:modelValue")![0][0];
    expect(emittedPayload).toContain(1);
  });

  it("props の modelValue が変更されたら内部のチェック状態が更新される", async () => {
    const wrapper = mount(PrefectureSelector, { props: { modelValue: [1] } });

    await wrapper.setProps({ modelValue: [2] });
    await nextTick();

    const checkbox = wrapper.find('input#pref2');
    expect((checkbox.element as HTMLInputElement).checked).toBe(true);
  });
});
