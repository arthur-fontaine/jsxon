# JSXon

*pronounced “jeekson” (`/ˈdʒiːksən/`)*

> JSXon is an experimental project to serve UI as JSON. You write JSX and the JSXon server will serve it as JSON.
> So you can get the UI from the server and render it on the client side using native components.

𝕏 (Twitter) made a framework named Jetfuel that “makes it lightning fast to build new features across all clients [natively]”. I wanted to recreate it.

→ https://x.com/AqueelMiq/status/1822364223466623117

## Example

In the [`example/`](./example) directory, you can see a simple example of how JSXon works.

In the [`example/pages/`](./example/pages) directory, you can see the JSX files that are served as JSON. The JSXon server will serve these JSX files as JSON. The path to get the JSON is the same as the path to the JSX file.

In the [`example/android/`](./example/android) directory, you can see an Android app that fetches the JSON from the JSXon server and renders it using native components.

To see it in action:

1. Run the JSXon server:

   ```sh
   cd example
   npx tsx ../src/cli/cli.ts ./pages
   ```

2. Run the Android app in an emulator or on a device.

<table>
<thead>
<tr>
<th>JSX</th>
<th>JSON (served by JSXon)</th>
<th>Android</th>
</tr>
</thead>

<tbody>
<tr>
<td>

```jsx
import JSXon, { HStack, Text, VStack } from "../../src";

export default <HStack>
  <Text text="Hello, JSXon1!" />
  <Text text="Hello, JSXon2!" />
  <VStack>
    <Text text="Hello, JSXon3!" />
    <Text text="Hello, JSXon4!" />
  </VStack>
</HStack>
```

</td>
<td>

```json
{
   "type":"jsxon:HStack",
   "props":{
      
   },
   "children":[
      {
         "type":"jsxon:Text",
         "props":{
            "text":"Hello, JSXon1!"
         }
      },
      {
         "type":"jsxon:Text",
         "props":{
            "text":"Hello, JSXon2!"
         }
      },
      {
         "type":"jsxon:VStack",
         "props":{
            
         },
         "children":[
            {
               "type":"jsxon:Text",
               "props":{
                  "text":"Hello, JSXon3!"
               }
            },
            {
               "type":"jsxon:Text",
               "props":{
                  "text":"Hello, JSXon4!"
               }
            }
         ]
      }
   ],
   "_isJSXon":true
}
```

</td>
<td>
<img src="./example/android/screenshots/screenshot1.png" width="200" />

[*Click on the image to enlarge*](./example/android/screenshots/screenshot1.png)

</td>
</tr>
</tbody>
</table>
