<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="navbar bg-base-300">
		<div class="flex-1">
			<a
				href="/"
				class="btn btn-ghost normal-case text-xl"
				aria-current={$page.url.pathname === '/' ? 'page' : undefined}>AS-BUILT</a
			>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<!-- <li><a href="/">Dashboard</a></li> -->
				<!-- <li><a href="/account">Account</a></li> -->
				<!--				<li>-->
				<!--					<details>-->
				<!--						<summary>-->
				<!--							Parent-->
				<!--						</summary>-->
				<!--						<ul class="p-2 bg-base-100">-->
				<!--							<li><a>Link 1</a></li>-->
				<!--							<li><a>Link 2</a></li>-->
				<!--						</ul>-->
				<!--					</details>-->
				<!--				</li>-->
			</ul>
		</div>
	</div>
</header>
