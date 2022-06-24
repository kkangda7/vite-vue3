<template>
	<div class="card p-3">
		<div v-if="$slots.header" class="card-header">
			<slot name="header" />
		</div>
		<div v-if="$slots.default" class="card-bodyr">
			<slot />
		</div>
		<div v-if="$slots.footer" class="card-footer">
			<slot name="footer" />
		</div>
	</div>
</template>
