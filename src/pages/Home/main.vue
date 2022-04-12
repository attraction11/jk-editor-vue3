<template>
  <div class="absolute -inset-0 overflow-hidden">
    <aside class="absolute inset-y-0 w-64 bg-gray-50 bolder-r border-gray-200">
      <img
        src="http://www.docease.cn/logo.png"
        class="cusor-pointer ml-8 mt-8 h-6"
      >
      <div class="mt-5 h-[calc(100%_-_105px)] overflow-y-hidden">
        <div class="mt-6 min-h-40 max-h-full cursor-pointer text-sm">
          <div
            class="mb-2.5 flex h-10 items-center bg-gray-200 px-4 hover:bg-gray-100"
          >
            <div class="w-3" />
            <div class="flex flex-1 items-center">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              ><g
                fill="none"
                fill-rule="evenodd"
              ><rect
                width="24"
                height="24"
                rx="2"
              /><path
                d="M18.22 4c.43 0 .78.35.78.78v14.44c0 .43-.35.78-.78.78H5.78a.78.78 0 0 1-.78-.78V4.78c0-.43.35-.78.78-.78h12.44Zm-.47 1.25H6.25v13.5h11.5V5.25Zm-1.95 9.99v1.17H8v-1.17h7.8Zm-2.34-3.12v1.17H8v-1.17h5.46ZM11.9 9v1.17H8V9h3.9Z"
                fill="#464D5A"
                fill-rule="nonzero"
              /></g></svg>
              <span class="pl-2">文件库</span>
            </div>
          </div>
          <div
            class="mb-2.5 flex h-10 items-center px-4 hover:bg-gray-100"
          >
            <div class="w-3" />
            <div class="flex flex-1 items-center">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              ><g
                fill="none"
                fill-rule="evenodd"
              ><rect
                width="24"
                height="24"
                rx="2"
              /><path
                d="M18.22 4c.43 0 .78.35.78.78v14.44c0 .43-.35.78-.78.78H5.78a.78.78 0 0 1-.78-.78V4.78c0-.43.35-.78.78-.78h12.44Zm-.47 1.25H6.25v13.5h11.5V5.25Zm-1.95 9.99v1.17H8v-1.17h7.8Zm-2.34-3.12v1.17H8v-1.17h5.46ZM11.9 9v1.17H8V9h3.9Z"
                fill="#464D5A"
                fill-rule="nonzero"
              /></g></svg>
              <span class="pl-2">我的收藏</span>
            </div>
          </div>
          <div class="mx-8 my-3 h-px bg-gray-200" />
          <div class="mb-2.5 flex h-10 items-center px-4 hover:bg-gray-100">
            <div class="w-3" />
            <div class="flex flex-1 items-center">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
              ><g
                fill="none"
                fill-rule="evenodd"
              ><rect
                width="24"
                height="24"
                rx="2"
              /><path
                d="M15.5 4a.5.5 0 0 1 .5.5v1.999l1.462.001H20v1.25l-2.093-.001-.873 11.788a.5.5 0 0 1-.498.463H7.464a.5.5 0 0 1-.498-.463L6.092 7.749 4 7.75V6.5l2.501.001a.5.5 0 0 1 .037-.001L8 6.499V4.5a.5.5 0 0 1 .5-.5h7Zm1.154 3.75H7.346l.815 11h7.678l.815-11ZM12.65 11v5H11.4v-5h1.25Zm2.1-5.75h-5.5v1.249h5.5V5.25Z"
                fill="#464D5A"
              /></g></svg>
              <span class="pl-2">回收站</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div class="relative ml-64 flex h-full flex-col">
      <div class="flex justify-between px-10 pt-6 pb-5">
        <div class="relative flex items-center">
          <div class="flex items-center justify-between">
            <div class="relative flex">
              <button
                type="button"
                class="w-28 h-12 mr-4 flex bg-blue-600 text-white cursor-pointer items-center justify-center rounded text-sm leading-9 hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
              >
                <!-- <button class="w-28 h-12 mr-4 flex h-9 text-white cursor-pointer items-center justify-center rounded text-sm leading-9 bg-blue-500 hover:bg-blue-600"> -->
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 16 16"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>_图标/Icon/新建</title>
                  <defs>
                    <path
                      d="M9.1,-2.31599945e-14 L9.1,6.899 L16,6.9 L16,9.1 L9.1,9.099 L9.1,16 L6.9,16 L6.9,9.099 L0,9.1 L0,6.9 L6.899,6.899 L6.9,-2.30252833e-14 L9.1,-2.31599945e-14 Z"
                      id="path-1"
                    />
                  </defs>
                  <g
                    id="列表页"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="New-列表页-normal"
                      transform="translate(-106.000000, -100.000000)"
                    >
                      <g
                        id="Button/large/01_normal"
                        transform="translate(32.000000, 88.000000)"
                      >
                        <g
                          id="新建-2"
                          transform="translate(74.000000, 9.000000)"
                        >
                          <g
                            id="编组"
                            transform="translate(0.000000, 3.000000)"
                          >
                            <mask
                              id="mask-2"
                              fill="white"
                            >
                              <use xlink:href="#path-1" />
                            </mask>
                            <use
                              id="新建icon"
                              fill="#FFFFFF"
                              xlink:href="#path-1"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <span class="ml-2">
                  新建
                </span>
              </button>
              <button class="w-28 h-12 mr-4 flex h-9 cursor-pointer items-center justify-center rounded text-sm leading-9 bg-gray-100 hover:bg-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 6.375C14.6528 6.375 12.75 8.27779 12.75 10.625V12.3852L14.255 10.8802L15.3156 11.9409L12.5301 14.7264L11.9998 15.2567L11.4694 14.7264L8.68391 11.9409L9.74457 10.8802L11.25 12.3856V10.625C11.25 7.44936 13.8244 4.875 17 4.875H20V6.375H17ZM5 5.625H9V7.125H5.5V18.125H18.5V11.625H20V18.625C20 19.1773 19.5523 19.625 19 19.625H5C4.44772 19.625 4 19.1773 4 18.625V6.625C4 6.07272 4.44772 5.625 5 5.625Z"
                    fill="#454D5A"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17 6.375C14.6528 6.375 12.75 8.27779 12.75 10.625V12.3852L14.255 10.8802L15.3156 11.9409L12.5301 14.7264L11.9998 15.2567L11.4694 14.7264L8.68391 11.9409L9.74457 10.8802L11.25 12.3856V10.625C11.25 7.44936 13.8244 4.875 17 4.875H20V6.375H17ZM5 5.625H9V7.125H5.5V18.125H18.5V11.625H20V18.625C20 19.1773 19.5523 19.625 19 19.625H5C4.44772 19.625 4 19.1773 4 18.625V6.625C4 6.07272 4.44772 5.625 5 5.625Z"
                    fill="url(#paint0_linear_2786_3873)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2786_3873"
                      x1="12"
                      y1="-2.5"
                      x2="-2.70133"
                      y2="13.4472"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#81868F" />
                      <stop
                        offset="1"
                        stop-color="#464D5A"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <span class="ml-2">
                  导入
                </span>
              </button>
              <button class="w-28 h-12 mr-4 flex h-9 cursor-pointer items-center justify-center rounded text-sm leading-9 bg-gray-100 hover:bg-gray-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.94064 9.49167L12.1134 4.87357C12.2024 4.74403 12.3796 4.71117 12.5091 4.80016C12.5379 4.81992 12.5628 4.8448 12.5825 4.87357L15.7553 9.49167C15.8443 9.6212 15.8115 9.79835 15.6819 9.88734C15.6345 9.91992 15.5783 9.93736 15.5208 9.93736H9.17518C9.01803 9.93736 8.89062 9.80996 8.89062 9.6528C8.89062 9.59527 8.90806 9.53909 8.94064 9.49167ZM11.0832 4.16573L7.91037 8.78383C7.73467 9.03956 7.64062 9.34254 7.64062 9.6528C7.64062 10.5003 8.32767 11.1874 9.17518 11.1874H15.5208C15.8311 11.1874 16.134 11.0933 16.3898 10.9176C17.0883 10.4377 17.2655 9.48237 16.7856 8.78383L13.6128 4.16573C13.5062 4.01063 13.3721 3.87645 13.217 3.76989C12.5184 3.28997 11.5631 3.46719 11.0832 4.16573ZM20.3374 12.4137V20.0173C20.3374 20.2841 20.1265 20.5004 19.8664 20.5004H12.2878C12.0277 20.5004 11.8168 20.2841 11.8168 20.0173C11.8168 19.8952 11.8619 19.7776 11.943 19.6882C12.0647 19.5541 12.1796 19.4201 12.2878 19.2862L12.3162 19.2509C13.159 18.1958 13.5808 17.1479 13.5808 16.1081C13.5808 15.1006 13.1469 14.1343 12.2792 13.2091L12.2552 13.1837L12.2482 13.1763C12.1423 13.0648 12.0301 12.9539 11.9116 12.8437C11.7189 12.6644 11.7244 12.3153 11.8992 12.1177C11.9874 12.0179 12.1123 11.9604 12.2437 11.9592L19.862 11.9307C20.1048 11.9284 20.3064 12.1149 20.3341 12.3567L20.3374 12.4137ZM13.8786 13.2031C14.4843 14.0833 14.8308 15.0528 14.8308 16.1081C14.8308 17.2124 14.4755 18.2619 13.8507 19.2504H19.0874V13.1836L13.8786 13.2031ZM7.81141 13.3564C6.19609 13.3564 4.90039 14.6518 4.90039 16.2329C4.90039 17.814 6.19609 19.1093 7.81141 19.1093C9.42674 19.1093 10.7224 17.814 10.7224 16.2329C10.7224 14.6518 9.42674 13.3564 7.81141 13.3564ZM3.65039 16.2329C3.65039 13.9501 5.51707 12.1064 7.81141 12.1064C10.1057 12.1064 11.9724 13.9501 11.9724 16.2329C11.9724 18.5156 10.1057 20.3593 7.81141 20.3593C5.51707 20.3593 3.65039 18.5156 3.65039 16.2329Z"
                    fill="#454D5A"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.94064 9.49167L12.1134 4.87357C12.2024 4.74403 12.3796 4.71117 12.5091 4.80016C12.5379 4.81992 12.5628 4.8448 12.5825 4.87357L15.7553 9.49167C15.8443 9.6212 15.8115 9.79835 15.6819 9.88734C15.6345 9.91992 15.5783 9.93736 15.5208 9.93736H9.17518C9.01803 9.93736 8.89062 9.80996 8.89062 9.6528C8.89062 9.59527 8.90806 9.53909 8.94064 9.49167ZM11.0832 4.16573L7.91037 8.78383C7.73467 9.03956 7.64062 9.34254 7.64062 9.6528C7.64062 10.5003 8.32767 11.1874 9.17518 11.1874H15.5208C15.8311 11.1874 16.134 11.0933 16.3898 10.9176C17.0883 10.4377 17.2655 9.48237 16.7856 8.78383L13.6128 4.16573C13.5062 4.01063 13.3721 3.87645 13.217 3.76989C12.5184 3.28997 11.5631 3.46719 11.0832 4.16573ZM20.3374 12.4137V20.0173C20.3374 20.2841 20.1265 20.5004 19.8664 20.5004H12.2878C12.0277 20.5004 11.8168 20.2841 11.8168 20.0173C11.8168 19.8952 11.8619 19.7776 11.943 19.6882C12.0647 19.5541 12.1796 19.4201 12.2878 19.2862L12.3162 19.2509C13.159 18.1958 13.5808 17.1479 13.5808 16.1081C13.5808 15.1006 13.1469 14.1343 12.2792 13.2091L12.2552 13.1837L12.2482 13.1763C12.1423 13.0648 12.0301 12.9539 11.9116 12.8437C11.7189 12.6644 11.7244 12.3153 11.8992 12.1177C11.9874 12.0179 12.1123 11.9604 12.2437 11.9592L19.862 11.9307C20.1048 11.9284 20.3064 12.1149 20.3341 12.3567L20.3374 12.4137ZM13.8786 13.2031C14.4843 14.0833 14.8308 15.0528 14.8308 16.1081C14.8308 17.2124 14.4755 18.2619 13.8507 19.2504H19.0874V13.1836L13.8786 13.2031ZM7.81141 13.3564C6.19609 13.3564 4.90039 14.6518 4.90039 16.2329C4.90039 17.814 6.19609 19.1093 7.81141 19.1093C9.42674 19.1093 10.7224 17.814 10.7224 16.2329C10.7224 14.6518 9.42674 13.3564 7.81141 13.3564ZM3.65039 16.2329C3.65039 13.9501 5.51707 12.1064 7.81141 12.1064C10.1057 12.1064 11.9724 13.9501 11.9724 16.2329C11.9724 18.5156 10.1057 20.3593 7.81141 20.3593C5.51707 20.3593 3.65039 18.5156 3.65039 16.2329Z"
                    fill="url(#paint0_linear_818_72273)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_818_72273"
                      x1="11.9939"
                      y1="-5.00021"
                      x2="-5.00359"
                      y2="11.6839"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#81868F" />
                      <stop
                        offset="1"
                        stop-color="#464D5A"
                      />
                    </linearGradient>
                  </defs>
                </svg>
                <span class="ml-2">
                  模板库
                </span>
              </button>
              <div
                class="invisible absolute left-0 top-11 z-10 box-border w-72 translate-y-4 rounded border border-gray-50 bg-white p-3.5 opacity-0 shadow-md duration-100 ease-in"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <button class="mx-4 text-gray-600 rounded hover:bg-gray-100 focus:text-gray-700 focus:outline-none">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            ><g
              fill="none"
              fill-rule="evenodd"
            ><rect
              width="24"
              height="24"
              rx="2"
            /><path
              d="M20 17v2H4v-2h16Zm0-6v2H4v-2h16Zm0-6v2H4V5h16Z"
              fill="#464D5A"
            /></g></svg>
          </button>

          <button
            type="button"
            class="flex items-center focus:outline-none"
            aria-label="toggle profile dropdown"
          >
            <div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                class="object-cover w-full h-full"
                alt="avatar"
              >
            </div>
          </button>
        </div>
      </div>
      <div class="flex items-center py-4 px-10 overflow-y-auto whitespace-nowrap">
        <a
          href="#"
          class="text-xl text-gray-800"
        >
          文件库
        </a>
      </div>
      <table class="mx-10 overflow-ellipsis whitespace-nowrap">
        <thead>
          <tr class="h-14 text-gray-800 top-0 uppercase text-center text-xs border-y first:border-t-0 border-gray-100">
            <th
              scope="col"
              class="px-4"
            >
              状态
            </th>
            <th
              scope="col"
              class="px-4"
            >
              文件名
            </th>
            <th
              scope="col"
              class="px-4"
            >
              创建人
            </th>
            <th
              scope="col"
              class="px-4"
            >
              最近修改
            </th>
            <th
              scope="col"
              class="px-4"
            >
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="h-14 text-center bg-white border-y first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
            @click="onRowClick"
          >
            <td class="px-4">
              <span class="text-xs text-white px-2 py-1 bg-gray-400">Draft</span>
            </td>
            <td class="px-4">
              财务管理制度
            </td>
            <td class="px-4">
              周斌
            </td>
            <td class="px-4">
              2021-08-12 16:55
            </td>
            <td class="px-4">
              <!---->
            </td>
          </tr>
          <tr
            class="h-14 text-center bg-white border-y first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
            @click="onRowClick"
          >
            <td class="px-4">
              <span class="text-xs text-white px-2 py-1 bg-blue-500">Review</span>
            </td>
            <td class="px-4">
              系统建设文档
            </td>
            <td class="px-4">
              陈少坤
            </td>
            <td class="px-4">
              2021-12-12 09:55
            </td>
            <td class="px-4">
              <!---->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    id="exampleModalCenter"
    tabindex="-1"
    aria-labelledby="exampleModalCenterTitle"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
      <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
        <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
          <h5
            class="text-xl font-medium leading-normal text-gray-800"
            id="exampleModalScrollableLabel"
          >
            新建文档
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div class="p-8">
          <div class="form-group mb-6">
            <label
              for="docName"
              class="form-label inline-block mb-2 text-gray-700"
            >文档名称</label>
            <input
              type="text"
              v-model="docName"
              class="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="docName"
              aria-describedby="emailHelp"
              placeholder="输入文档名称"
            >
          </div>
          <div class="form-group mb-10">
            <label
              for="createName"
              class="form-label inline-block mb-2 text-gray-700"
            >创建者</label>
            <input
              type="text"
              v-model="createName"
              class="form-control block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="createName"
              placeholder="输入创建者"
            >
          </div>
          <button
            class="
              flex
              justify-center
              w-1/2
              m-auto
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-sm
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out"
            data-bs-dismiss="modal"
            @click="onCreateClick"
          >
            创建
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="relative bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg  mb-3"
    :class="showTip ? 'block' : 'hidden'"
    id="static-example"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-mdb-autohide="false"
  >
    <div class="bg-green-500 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
      <p class="font-bold text-white flex items-center">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check-circle"
          class="w-4 h-4 mr-2 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
          />
        </svg>
        提示
      </p>
      <div class="flex items-center">
        <button
          type="button"
          class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
          data-mdb-dismiss="toast"
          aria-label="Close"
          @click="showTip = false"
        />
      </div>
    </div>
    <div class="p-3 bg-green-500 rounded-b-lg break-words text-white text-center">
      {{ fetchTips }}
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeIndex">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchHomeDocs, fetchDocCreate } from '~/api/home'

const router = useRouter()
const docName = ref<string>('')
const createName = ref<string>('')
const fetchTips = ref<string>('')
const showTip = ref<boolean>(false)
const dataSource = ref([])

// 事件处理
const onRowClick = () => {
  router.push({ path: '/docs' }).catch((err) => {
    console.warn(err)
  })
}

const onCreateClick = async () => {
  try {
    await fetchDocCreate({
      folderId: '1024',
      name: docName.value,
      creator: createName.value
    })
    fetchTips.value = '成功创建一个文档~'
  } catch (error) {
    fetchTips.value = '创建失败！'
  }

  showTip.value = true
  setTimeout(() => {
    showTip.value = false
  }, 1000)
}

// 生命周期钩子
onMounted(async () => {
  const result = await fetchHomeDocs({ id: '1024' })
  dataSource.value = result.list
})
</script>
