import Vue from 'vue'

import Autocomplete from './Autocomplete/Autocomplete.vue'
import Field from './Field/Field.vue'
import Fieldset from './Fieldset/Fieldset.vue'
import Form from './Form/Form.vue'
import Input from './Input/Input.vue'
import Upload from './Upload/Upload.vue'

import './Inputs/Inputs.js';
import './Fields/Fields.js';

Vue.component('kirby-autocomplete', Autocomplete);
Vue.component('kirby-field', Field);
Vue.component('kirby-fieldset', Fieldset);
Vue.component('kirby-form', Form);
Vue.component('kirby-input', Input);
Vue.component('kirby-upload', Upload);

/* Blocks Editor */
import Blocks from './Blocks/Blocks.vue'
import Block from './Blocks/Block.vue'
import CodeBlock from './Blocks/CodeBlock/CodeBlock.vue'
import HeadlineBlock from './Blocks/HeadlineBlock/HeadlineBlock.vue'
import ImageBlock from './Blocks/ImageBlock/ImageBlock.vue'
import ListBlock from './Blocks/ListBlock/ListBlock.vue'
import QuoteBlock from './Blocks/QuoteBlock/QuoteBlock.vue'
import SubheadlineBlock from './Blocks/SubheadlineBlock/SubheadlineBlock.vue'
import TextBlock from './Blocks/TextBlock/TextBlock.vue'

Vue.component('kirby-blocks', Blocks);
Vue.component('kirby-block', Block);
Vue.component('kirby-code-block', CodeBlock);
Vue.component('kirby-headline-block', HeadlineBlock);
Vue.component('kirby-image-block', ImageBlock);
Vue.component('kirby-list-block', ListBlock);
Vue.component('kirby-quote-block', QuoteBlock);
Vue.component('kirby-subheadline-block', SubheadlineBlock);
Vue.component('kirby-text-block', TextBlock);

