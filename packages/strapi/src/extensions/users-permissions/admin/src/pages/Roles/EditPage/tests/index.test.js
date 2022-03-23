import React from 'react';
import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, lightTheme } from '@strapi/design-system';
import { Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { createMemoryHistory } from 'history';
import pluginId from '../../../../pluginId';
import RolesEditPage from '..';
import server from './server';

jest.mock('@strapi/helper-plugin', () => {
  // Make sure the references of the mock functions stay the same, otherwise we get an endless loop
  const mockToggleNotification = jest.fn();
  const mockUseNotification = jest.fn(() => {
    return mockToggleNotification;
  });

  return {
    ...jest.requireActual('@strapi/helper-plugin'),
    useNotification: mockUseNotification,
    useOverlayBlocker: jest.fn(() => ({ lockApp: jest.fn(), unlockApp: jest.fn() })),
  };
});

function makeAndRenderApp() {
  const history = createMemoryHistory();
  const app = (
    <IntlProvider locale="en" messages={{}} textComponent="span">
      <ThemeProvider theme={lightTheme}>
        <Router history={history}>
          <Switch>
            <Route path={`/settings/${pluginId}/roles/:id`} component={RolesEditPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </IntlProvider>
  );
  const renderResult = render(app);
  history.push(`/settings/${pluginId}/roles/1`);

  return renderResult;
}

describe('Admin | containers | RoleEditPage', () => {
  beforeAll(() => server.listen());

  beforeEach(() => jest.clearAllMocks());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('renders users-permissions edit role and matches snapshot', async () => {
    const { container, getByTestId, getByRole } = makeAndRenderApp();
    await waitForElementToBeRemoved(() => getByTestId('loader'));
    await waitFor(() => expect(getByRole('heading', { name: /permissions/i })).toBeInTheDocument());

    expect(container.firstChild).toMatchInlineSnapshot(`
      .c1 {
        background: #f6f6f9;
        padding-top: 24px;
        padding-right: 56px;
        padding-bottom: 40px;
        padding-left: 56px;
      }

      .c2 {
        padding-bottom: 8px;
      }

      .c18 {
        padding-right: 56px;
        padding-left: 56px;
      }

      .c7 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c8 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c9 {
        color: #32324d;
        font-weight: 600;
        font-size: 2rem;
        line-height: 1.25;
      }

      .c17 {
        color: #666687;
        font-size: 1rem;
        line-height: 1.5;
      }

      .c0:focus-visible {
        outline: none;
      }

      .c16 {
        font-weight: 600;
        color: #32324d;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c13 {
        padding-right: 8px;
      }

      .c10 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #dcdce4;
        position: relative;
        outline: none;
      }

      .c10 svg {
        height: 12px;
        width: 12px;
      }

      .c10 svg > g,
      .c10 svg path {
        fill: #ffffff;
      }

      .c10[aria-disabled='true'] {
        pointer-events: none;
      }

      .c10:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c10:focus-visible {
        outline: none;
      }

      .c10:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c14 {
        height: 100%;
      }

      .c11 {
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 8px 16px;
        background: #4945ff;
        border: none;
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c11 .c12 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c11 .c15 {
        color: #ffffff;
      }

      .c11[aria-disabled='true'] {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c11[aria-disabled='true'] .c15 {
        color: #666687;
      }

      .c11[aria-disabled='true'] svg > g,
      .c11[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c11[aria-disabled='true']:active {
        border: 1px solid #dcdce4;
        background: #eaeaef;
      }

      .c11[aria-disabled='true']:active .c15 {
        color: #666687;
      }

      .c11[aria-disabled='true']:active svg > g,
      .c11[aria-disabled='true']:active svg path {
        fill: #666687;
      }

      .c11:hover {
        border: 1px solid #7b79ff;
        background: #7b79ff;
      }

      .c11:active {
        border: 1px solid #4945ff;
        background: #4945ff;
      }

      .c11 svg > g,
      .c11 svg path {
        fill: #ffffff;
      }

      .c19 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c19 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c19 > * + * {
        margin-top: 32px;
      }

      .c21 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c21 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c21 > * + * {
        margin-top: 16px;
      }

      .c41 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c41 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c41 > * + * {
        margin-top: 24px;
      }

      .c42 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c42 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c42 > * + * {
        margin-top: 8px;
      }

      .c44 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c44 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c44 > * + * {
        margin-top: 4px;
      }

      .c20 {
        background: #ffffff;
        padding-top: 24px;
        padding-right: 32px;
        padding-bottom: 24px;
        padding-left: 32px;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c27 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c28 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c26 {
        font-weight: 600;
        color: #32324d;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c30 {
        border: none;
        border-radius: 4px;
        padding-left: 16px;
        padding-right: 16px;
        color: #32324d;
        font-weight: 400;
        font-size: 0.875rem;
        display: block;
        width: 100%;
        background: inherit;
      }

      .c30::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c30::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c30:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c30::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c30[aria-disabled='true'] {
        color: inherit;
      }

      .c30:focus {
        outline: none;
        box-shadow: none;
      }

      .c29 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        background: #ffffff;
        height: 2.5rem;
        outline: none;
        box-shadow: 0;
        -webkit-transition-property: border-color,box-shadow,fill;
        transition-property: border-color,box-shadow,fill;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
      }

      .c29:focus-within {
        border: 1px solid #4945ff;
        box-shadow: #4945ff 0px 0px 0px 2px;
      }

      .c25 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c25 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c25 > * + * {
        margin-top: 4px;
      }

      .c33 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c34 {
        font-weight: 600;
        color: #32324d;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c35 {
        border: 1px solid #dcdce4;
        border-radius: 4px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 12px;
        padding-bottom: 12px;
        background: #ffffff;
        outline: none;
        box-shadow: 0;
        -webkit-transition-property: border-color,box-shadow,fill;
        transition-property: border-color,box-shadow,fill;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
      }

      .c35:focus-within {
        border: 1px solid #4945ff;
        box-shadow: #4945ff 0px 0px 0px 2px;
      }

      .c36 {
        display: block;
        width: 100%;
        font-weight: 400;
        font-size: 0.875rem;
        border: none;
        color: #32324d;
        resize: none;
        background: inherit;
      }

      .c36::-webkit-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c36::-moz-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c36:-ms-input-placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c36::placeholder {
        color: #8e8ea9;
        opacity: 1;
      }

      .c36:focus-within {
        outline: none;
      }

      .c32 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c32 > * {
        margin-top: 0;
        margin-bottom: 0;
      }

      .c32 > * + * {
        margin-top: 4px;
      }

      .c31 textarea {
        height: 5rem;
        line-height: 1.25rem;
      }

      .c31 textarea::-webkit-input-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c31 textarea::-moz-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c31 textarea:-ms-input-placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c31 textarea::placeholder {
        font-weight: 400;
        font-size: 0.875rem;
        line-height: 1.43;
        color: #8e8ea9;
        opacity: 1;
      }

      .c22 {
        color: #32324d;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25;
      }

      .c43 {
        color: #666687;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c6 {
        color: #4945ff;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c4 {
        padding-right: 8px;
      }

      .c3 {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-text-decoration: none;
        text-decoration: none;
        position: relative;
        outline: none;
      }

      .c3 svg path {
        fill: #4945ff;
      }

      .c3 svg {
        font-size: 0.625rem;
      }

      .c3:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c3:focus-visible {
        outline: none;
      }

      .c3:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c5 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c37 {
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 1px 4px rgba(33,33,52,0.1);
      }

      .c40 {
        padding-top: 24px;
        padding-right: 32px;
        padding-bottom: 24px;
        padding-left: 32px;
      }

      .c65 {
        background: #eaeaef;
        padding-top: 24px;
        padding-right: 32px;
        padding-bottom: 24px;
        padding-left: 32px;
      }

      .c23 {
        display: grid;
        grid-template-columns: repeat(12,1fr);
        gap: 16px;
      }

      .c38 {
        display: grid;
        grid-template-columns: repeat(12,1fr);
        gap: 0px;
      }

      .c24 {
        grid-column: span 6;
        max-width: 100%;
      }

      .c39 {
        grid-column: span 7;
        max-width: 100%;
      }

      .c64 {
        grid-column: span 5;
        max-width: 100%;
      }

      .c56 {
        color: #4945ff;
        font-size: 0.75rem;
        line-height: 1.33;
      }

      .c57 {
        color: #4a4a6a;
        font-weight: 500;
        font-size: 1rem;
        line-height: 1.25;
      }

      .c58 {
        color: #666687;
        font-size: 0.875rem;
        line-height: 1.43;
      }

      .c45 {
        border-radius: 4px;
      }

      .c48 {
        background: #f6f6f9;
        padding-right: 24px;
        padding-left: 24px;
      }

      .c51 {
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }

      .c60 {
        background: #dcdce4;
        border-radius: 50%;
        cursor: pointer;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
      }

      .c62 {
        color: #666687;
        width: 0.6875rem;
      }

      .c49 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c52 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c61 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .c46 {
        border: 1px solid #f6f6f9;
      }

      .c46:hover:not([aria-disabled='true']) {
        border: 1px solid #4945ff;
      }

      .c46:hover:not([aria-disabled='true']) .sc-ieCETs {
        color: #271fe0;
      }

      .c46:hover:not([aria-disabled='true']) .c55 {
        color: #4945ff;
      }

      .c46:hover:not([aria-disabled='true']) > .c47 {
        background: #f0f0ff;
      }

      .c46:hover:not([aria-disabled='true']) [data-strapi-dropdown='true'] {
        background: #d9d8ff;
      }

      .c53 {
        background: transparent;
        border: none;
        position: relative;
        outline: none;
      }

      .c53[aria-disabled='true'] {
        pointer-events: none;
      }

      .c53[aria-disabled='true'] svg path {
        fill: #666687;
      }

      .c53 svg {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        font-size: 0.625rem;
      }

      .c53 svg path {
        fill: #4945ff;
      }

      .c53:after {
        -webkit-transition-property: all;
        transition-property: all;
        -webkit-transition-duration: 0.2s;
        transition-duration: 0.2s;
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: 2px solid transparent;
      }

      .c53:focus-visible {
        outline: none;
      }

      .c53:focus-visible:after {
        border-radius: 8px;
        content: '';
        position: absolute;
        top: -5px;
        bottom: -5px;
        left: -5px;
        right: -5px;
        border: 2px solid #4945ff;
      }

      .c59 > * {
        margin-left: 0;
        margin-right: 0;
      }

      .c59 > * + * {
        margin-left: 12px;
      }

      .c63 path {
        fill: #666687;
      }

      .c54 {
        text-align: left;
      }

      .c54 svg {
        width: 0.875rem;
        height: 0.875rem;
      }

      .c54 svg path {
        fill: #8e8ea9;
      }

      .c50 {
        height: 5.5rem;
        border-radius: 4px;
      }

      .c50:hover svg path {
        fill: #4945ff;
      }

      @media (max-width:68.75rem) {
        .c24 {
          grid-column: span;
        }
      }

      @media (max-width:34.375rem) {
        .c24 {
          grid-column: span;
        }
      }

      @media (max-width:68.75rem) {
        .c39 {
          grid-column: span;
        }
      }

      @media (max-width:34.375rem) {
        .c39 {
          grid-column: span;
        }
      }

      @media (max-width:68.75rem) {
        .c64 {
          grid-column: span;
        }
      }

      @media (max-width:34.375rem) {
        .c64 {
          grid-column: span;
        }
      }

      <main
        aria-labelledby="main-content-title"
        class="c0"
        id="main-content"
        tabindex="-1"
      >
        <form
          action="#"
          novalidate=""
        >
          <div
            style="height: 0px;"
          >
            <div
              class="c1"
              data-strapi-header="true"
            >
              <div
                class="c2"
              >
                <a
                  aria-current="page"
                  class="c3 active"
                  href="/settings/users-permissions/roles"
                >
                  <span
                    aria-hidden="true"
                    class="c4 c5"
                  >
                    <svg
                      fill="none"
                      height="1em"
                      viewBox="0 0 24 24"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24 13.3a.2.2 0 01-.2.2H5.74l8.239 8.239a.2.2 0 010 .282L12.14 23.86a.2.2 0 01-.282 0L.14 12.14a.2.2 0 010-.282L11.86.14a.2.2 0 01.282 0L13.98 1.98a.2.2 0 010 .282L5.74 10.5H23.8c.11 0 .2.09.2.2v2.6z"
                        fill="#212134"
                      />
                    </svg>
                  </span>
                  <span
                    class="c6"
                  >
                    Back
                  </span>
                </a>
              </div>
              <div
                class="c7"
              >
                <div
                  class="c8"
                >
                  <h1
                    class="c9"
                  >
                    Authenticated
                  </h1>
                </div>
                <button
                  aria-disabled="false"
                  class="c10 c11"
                  type="submit"
                >
                  <div
                    aria-hidden="true"
                    class="c12 c13 c14"
                  >
                    <svg
                      fill="none"
                      height="1em"
                      viewBox="0 0 24 24"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.727 2.97a.2.2 0 01.286 0l2.85 2.89a.2.2 0 010 .28L9.554 20.854a.2.2 0 01-.285 0l-9.13-9.243a.2.2 0 010-.281l2.85-2.892a.2.2 0 01.284 0l6.14 6.209L20.726 2.97z"
                        fill="#212134"
                      />
                    </svg>
                  </div>
                  <span
                    class="c15 c16"
                  >
                    Save
                  </span>
                </button>
              </div>
              <p
                class="c17"
              >
                Default role given to authenticated user.
              </p>
            </div>
          </div>
          <div
            class="c18"
          >
            <div
              class="c19"
              spacing="7"
            >
              <div
                class="c20"
              >
                <div
                  class="c21"
                  spacing="4"
                >
                  <h2
                    class="c22"
                  >
                    Role details
                  </h2>
                  <div
                    class="c23"
                  >
                    <div
                      class="c24"
                    >
                      <div
                        class=""
                      >
                        <div>
                          <div>
                            <div
                              class="c25"
                              spacing="1"
                            >
                              <label
                                class="c26"
                                for="textinput-1"
                              >
                                <div
                                  class="c27"
                                >
                                  Name
                                </div>
                              </label>
                              <div
                                class="c28 c29"
                              >
                                <input
                                  aria-disabled="false"
                                  aria-invalid="false"
                                  class="c30"
                                  id="textinput-1"
                                  name="name"
                                  value="Authenticated"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="c24"
                    >
                      <div
                        class=""
                      >
                        <div
                          class="c31"
                        >
                          <div>
                            <div
                              class="c32"
                              spacing="1"
                            >
                              <div
                                class="c33"
                              >
                                <label
                                  class="c34"
                                  for="textarea-1"
                                >
                                  <div
                                    class="c33"
                                  >
                                    Description
                                  </div>
                                </label>
                              </div>
                              <div
                                class="c35"
                              >
                                <textarea
                                  aria-invalid="false"
                                  class="c36"
                                  id="textarea-1"
                                  name="description"
                                >
                                  Default role given to authenticated user.
                                </textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="c37 c38"
              >
                <div
                  class="c39"
                >
                  <div
                    class="c40"
                  >
                    <div
                      class="c41"
                      spacing="6"
                    >
                      <div
                        class="c42"
                        spacing="2"
                      >
                        <h2
                          class="c22"
                        >
                          Permissions
                        </h2>
                        <p
                          class="c43"
                        >
                          Only actions bound by a route are listed below.
                        </p>
                      </div>
                      <div
                        class="c44"
                        spacing="1"
                      >
                        <div
                          aria-disabled="false"
                          class="c45 c46"
                          data-strapi-expanded="false"
                        >
                          <div
                            class="c47 c48 c49 c50"
                            cursor=""
                          >
                            <button
                              aria-controls="accordion-content-accordion-1"
                              aria-disabled="false"
                              aria-expanded="false"
                              aria-labelledby="accordion-label-accordion-1"
                              class="c47 c51 c52 c53 c54"
                              data-strapi-accordion-toggle="true"
                              type="button"
                            >
                              <span
                                class="c55 c56"
                              >
                                <span
                                  class="c55 c57"
                                  id="accordion-label-accordion-1"
                                >
                                  Address
                                </span>
                                <p
                                  class="c55 c58"
                                  id="accordion-desc-accordion-1"
                                >
                                  Define all allowed actions for the api::address plugin.
                                </p>
                              </span>
                            </button>
                            <div
                              class="c47 c52 c59"
                              spacing="3"
                            >
                              <span
                                aria-hidden="true"
                                class="c47 c60 c61"
                                cursor="pointer"
                                data-strapi-dropdown="true"
                                height="2rem"
                                width="2rem"
                              >
                                <svg
                                  class="c62 c63"
                                  fill="none"
                                  height="1em"
                                  viewBox="0 0 14 8"
                                  width="0.6875rem"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    clip-rule="evenodd"
                                    d="M14 .889a.86.86 0 01-.26.625L7.615 7.736A.834.834 0 017 8a.834.834 0 01-.615-.264L.26 1.514A.861.861 0 010 .889c0-.24.087-.45.26-.625A.834.834 0 01.875 0h12.25c.237 0 .442.088.615.264a.86.86 0 01.26.625z"
                                    fill="#32324D"
                                    fill-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="c64"
                >
                  <div
                    class="c65"
                    style="min-height: 100%;"
                  >
                    <div
                      class="c42"
                      spacing="2"
                    >
                      <h3
                        class="c22"
                      >
                        Advanced settings
                      </h3>
                      <p
                        class="c43"
                      >
                        Select the application's actions or the plugin's actions and click on the cog icon to display the bound route
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    `);
  });

  it("can edit a users-permissions role's name and description", async () => {
    const { getByLabelText, getByRole, getByTestId, getAllByText } = makeAndRenderApp();

    // Check loading screen
    const loader = getByTestId('loader');
    expect(loader).toBeInTheDocument();

    // After loading, check other elements
    await waitForElementToBeRemoved(loader);
    const saveButton = getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    const nameField = getByLabelText(/name/i);
    expect(nameField).toBeInTheDocument();
    const descriptionField = getByLabelText(/description/i);
    expect(descriptionField).toBeInTheDocument();

    // Shows error when name is missing
    await userEvent.clear(nameField);
    expect(nameField).toHaveValue('');
    await userEvent.clear(descriptionField);
    expect(descriptionField).toHaveValue('');

    // Show errors after form submit
    await userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).not.toBeDisabled());
    const errorMessages = await getAllByText(/invalid value/i);
    errorMessages.forEach(errorMessage => expect(errorMessage).toBeInTheDocument());
  });

  it('can toggle the permissions accordions and actions', async () => {
    // Create app and wait for loading
    const {
      getByLabelText,
      queryByText,
      getByTestId,
      getByText,
      getAllByRole,
    } = makeAndRenderApp();
    const loader = getByTestId('loader');
    await waitForElementToBeRemoved(loader);

    // Open the collapse
    const collapse = getByText(/define all allowed actions for the api::address plugin/i);
    await userEvent.click(collapse);
    expect(getByLabelText(/select all/i)).toBeInTheDocument();

    // Display the selected action's bound route
    const actionCogButton = getByTestId('action-cog');
    await userEvent.click(actionCogButton);
    expect(getByText(/bound route to/i)).toBeInTheDocument();
    expect(getByText('POST')).toBeInTheDocument();
    expect(getByText('/addresses')).toBeInTheDocument();

    // Select all actions with the "select all" checkbox
    const [selectAllCheckbox, ...actionCheckboxes] = getAllByRole('checkbox');
    expect(selectAllCheckbox.checked).toBe(false);
    await userEvent.click(selectAllCheckbox);
    actionCheckboxes.forEach(actionCheckbox => {
      expect(actionCheckbox.checked).toBe(true);
    });

    // Close the collapse
    await userEvent.click(collapse);
    expect(queryByText(/select all/i)).not.toBeInTheDocument();
  });
});
