/**
 * Copyright 2019, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {assert} = require('chai');
const {TranslationServiceClient} = require('@google-cloud/translate').v3beta1;
const execa = require('execa');
const exec = async cmd => (await execa.shell(cmd)).stdout;

const REGION_TAG = 'translate_translate_text_with_model_beta';

describe(REGION_TAG, () => {
  const translationClient = new TranslationServiceClient();
  const location = 'us-central1';
  const modelId = 'TRL188026453969732486';
  const input = 'Tell me how this ends';

  it('should translate text with an automl model in project', async () => {
    const projectId = await translationClient.getProjectId();
    const output = await exec(
      `node v3beta1/${REGION_TAG}.js ${projectId} ${location} ${modelId} ${input}`
    );
    assert.match(output, /Translated Content: これがどのように終わるか教えて/);
  });
});