package com.arthurfontaine.myapplication.jsxon.components

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.arthurfontaine.myapplication.jsxon.JsxonPayload

@Composable
fun JsxonVStack(jsxonPayload: JsxonPayload) {
    val children = jsxonPayload.children ?: emptyList()
    val gap = jsxonPayload.props["gap"] ?: 0

    Column(
//        modifier = Modifier.padding(gap.dp)
    ) {
        children.forEach { child ->
            Jsxon(jsxonPayload = child)
        }
    }
}
