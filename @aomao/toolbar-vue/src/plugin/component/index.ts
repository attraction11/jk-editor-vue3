import {
	$,
	Card,
	isEngine,
	NodeInterface,
	isHotkey,
	CardType,
	isServer,
	CardValue,
} from '@aomao/engine';
import {
	CollapseGroupProps,
	CollapseItemProps,
	CollapseProps,
} from '../../types';
import { getToolbarDefaultConfig } from '../../config';
import CollapseComponent, { CollapseComponentInterface } from './collapse';
import ToolbarPopup from './popup';
import './index.css';

type Data = Array<CollapseGroupProps>;

export interface ToolbarValue extends CardValue {
	data: Data;
}

class ToolbarComponent<V extends ToolbarValue = ToolbarValue> extends Card<V> {
	private keyword?: NodeInterface;
	private placeholder?: NodeInterface;
	private component?: CollapseComponentInterface;
	#collapseData?: Data;
	#data?: any;

	static get cardName() {
		return 'toolbar';
	}

	static get cardType() {
		return CardType.INLINE;
	}

	static get singleSelectable() {
		return false;
	}

	static get autoSelected() {
		return false;
	}

	init() {
		if (!isEngine(this.editor) || isServer) {
			return;
		}

		this.component = new CollapseComponent(this.editor, {
			onCancel: () => {
				this.changeToText();
			},
			onSelect: () => {
				this.remove();
			},
		});
	}

	setData(_data: any) {
		this.#data = _data;
	}

	getData(): Data {
		if (!isEngine(this.editor)) {
			return [];
		}
		const data:
			| Data
			| { title: any; items: Omit<CollapseItemProps, 'engine'>[] }[] = [];
		const defaultConfig = getToolbarDefaultConfig(this.editor);
		const collapseConfig = defaultConfig.find(
			({ type }) => type === 'collapse',
		);
		let collapseGroups: Array<CollapseGroupProps> = [];
		if (collapseConfig)
			collapseGroups = (collapseConfig as CollapseProps).groups;
		const collapseItems: Array<Omit<CollapseItemProps, 'engine'>> = [];
		collapseGroups.forEach((group) => {
			collapseItems.push(...group.items);
		});
		const value = this.getValue();
		(this.#data || (value ? value.data : []) || []).forEach(
			(group: any) => {
				const title = group.title;
				const items: Array<Omit<CollapseItemProps, 'engine'>> = [];
				group.items.forEach((item: any) => {
					let name = item;
					if (typeof item !== 'string') name = item.name;
					const collapseItem = collapseItems.find(
						(item) => item.name === name,
					);
					if (collapseItem) {
						items.push({
							...collapseItem,
							...(typeof item !== 'string' ? item : {}),
							disabled: collapseItem.onDisabled
								? collapseItem.onDisabled()
								: !this.editor.command.queryEnabled(name),
						});
					}
				});
				data.push({
					title,
					items,
				});
			},
		);
		return data;
	}

	/**
	 * ??????
	 * @param keyword ?????????
	 * @returns
	 */
	search(keyword: string) {
		const items: Array<Omit<CollapseItemProps, 'engine'>> = [];
		// search with case insensitive
		if (typeof keyword === 'string') keyword = keyword.toLowerCase();
		// ???????????????????????????????????????????????????????????????

		if (!this.#collapseData) this.#collapseData = [];
		this.#collapseData.forEach((group) => {
			group.items.forEach((item) => {
				if (
					item.search &&
					item.search.toLowerCase().indexOf(keyword) >= 0
				) {
					if (!items.find(({ name }) => name === item.name)) {
						items.push({ ...item });
					}
				}
			});
		});
		const data = [];
		if (items.length > 0) {
			data.push({
				title: '',
				items: items,
			});
		}
		return data;
	}

	remove() {
		if (!isEngine(this.editor)) return;
		this.component?.remove();
		this.editor.card.remove(this.id);
	}

	changeToText() {
		if (!this.root.inEditor() || !isEngine(this.editor)) {
			return;
		}

		const content = this.keyword?.get<HTMLElement>()?.innerText || '';
		this.remove();
		this.editor.node.insertText(content);
	}

	destroy() {
		this.component?.unbindEvents();
		this.component?.remove();
	}

	activate(activated: boolean) {
		super.activate(activated);
		if (!activated) {
			this.component?.unbindEvents();
			this.changeToText();
		}
	}

	handleInput() {
		if (!isEngine(this.editor)) return;
		const { change, card } = this.editor;
		if (change.isComposing()) {
			return;
		}
		const content =
			this.keyword
				?.get<HTMLElement>()
				?.innerText.replace(/[\r\n]/g, '') || '';
		// ????????????
		if (content === '') {
			this.component?.remove();
			card.remove(this.id);
			return;
		}

		const keyword = content.substr(1);
		// ?????????????????????
		if (keyword === '') {
			this.component?.render(
				this.editor.root,
				this.root,
				this.#collapseData || [],
			);
			return;
		}
		const data = this.search(keyword);
		this.component?.render(this.editor.root, this.root, data);
	}

	resetPlaceHolder() {
		if ('/' === this.keyword?.get<HTMLElement>()?.innerText)
			this.placeholder?.show();
		else this.placeholder?.hide();
	}

	render(data?: any): string | void | NodeInterface {
		this.setData(data);
		const editor = this.editor;
		if (!isEngine(editor) || isServer) return;
		const language = editor.language.get<{ placeholder: string }>(
			'toolbar',
			'component',
		);
		this.root.attributes('data-transient', 'true');
		this.root.attributes('contenteditable', 'false');
		// ????????????
		const container = $(
			`<span class="data-toolbar-component-keyword" contenteditable="true">/</span><span class="data-toolbar-component-placeholder">${language['placeholder']}</span>`,
		);
		const center = this.getCenter();
		center.empty().append(container);
		this.keyword = center.find('.data-toolbar-component-keyword');
		this.placeholder = center.find('.data-toolbar-component-placeholder');
		// ??????????????????
		this.keyword?.on('keydown', (e) => {
			if (isHotkey('enter', e)) {
				e.preventDefault();
			}
		});
		const renderTime = Date.now();
		this.keyword?.on('input', () => {
			this.resetPlaceHolder();
			// ??? Windows ?????????????????????????????? keydown ???????????????????????????????????????????????????????????????????????????
			if (Date.now() - renderTime < 200) {
				const textNode = this.keyword?.first();
				if (
					(textNode &&
						textNode.isText() &&
						textNode[0].nodeValue === '/???') ||
					textNode?.get<Text>()?.nodeValue === '//'
				) {
					const text = textNode.get<Text>()?.splitText(1);
					text?.remove();
				}
			}

			setTimeout(() => {
				this.handleInput();
			}, 10);
		});
		if (!this.#collapseData) this.#collapseData = this.getData();
		// ??????????????????
		this.component?.render(editor.root, this.root, this.#collapseData);
	}
}

export default ToolbarComponent;
export { ToolbarPopup };
